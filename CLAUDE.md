# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

ZinfiniTree ("zt") is a generic, metadata-driven object/data platform: a Node.js `client` and `server`, each an Express app, backed by MongoDB. Almost nothing is hard-coded as a domain model — object kinds, fields, links between objects, templates, and even validation rules are themselves stored as data ("objects") and interpreted generically at runtime. There is no build step, no bundler, no TypeScript, and no automated test suite — this is a long-running, hand-maintained plain-JS codebase.

## Running it

**Locally (no Docker):**
```bash
# requires MongoDB running locally, and server/.env DB_URL pointing at it
cd server && node zt_server.js     # listens on process.env.PORT, default 5001
cd client && node zt_client.js     # listens on ZT_CLIENT_PORT, default 3000
```
Then open `http://localhost:3000/zt/file_import` to load initial data, then `http://localhost:3000` for the app. See `README.md` for the full first-run data-loading sequence (which record-format files to import, in order).

**Docker:**
```bash
docker compose up   # builds Dockerfile.zinfinitree-server and Dockerfile.zinfinitree-client
```
`docker-compose.yml` sets `DB_URL` (Mongo connection string), `ZT_SERVER_STARTUP_PARAMS` (JSON array defining the available target namespaces/instances, e.g. TST1, DOC1, ZIN1), and `ZINFINITREE_WEBSITE_PARAMETERS` for the client.

There is no lint, build, or test command defined in `package.json` (it only lists dependencies). `test/` contains a handful of standalone scripts invoked directly with `node test/<name>.js` (e.g. `test_call_process_workflow.js` posts to a running server's `/zt/process_workflow`) — they are manual integration probes against a live server, not an automated suite.

To wipe a namespace/instance during development, use the admin console at `http://localhost:5001/zt/admin_console` (see README.md steps 12-15 for the full delete workflow).

## Architecture

### Client / server split
- `server/zt_server.js` — Express app exposing REST-ish object CRUD (`/ZtObjectDbRec*`) plus the core message endpoint `/zt/process_message`, an admin console (`/zt/admin_console`, `/zt/devb/server/process_admin_console_request`), and workflow/record-format processing endpoints.
- `client/zt_client.js` — Express app serving the HTML UI (`zt_main.html`, `zt_query.html`, `zt_maintain_object.html`, `zt_file_import.html`, `zt_app_logon.html`) and endpoints like `/zt/client/process_file`, `/zt/client/process_query`, `/zt/client/maintain_object`, `/zt/client/maintain_object_submit`, `/zt/client/app_page_display`. The client builds/parses messages and calls the server's `/zt/process_message`.
- Both sides maintain a parallel, largely duplicated set of "engine" classes (`zt_*_object.js`, `zt_*_message*.js`, `zt_*_class.js`, etc.) — when tracing a concept, expect to find analogous logic on both the `server/` and `client/` sides, not shared code.

### The generic object model
Everything (object kinds, individual objects, templates, technical profiles, links, workflows, sets, runtime profiles) is a `ZtObject` (`server/zt_server_object.js`, similarly on the client) distinguished only by which "kind" it is. An object's identity is a compound key string built from:

```
dbzti_id (database/instance id) + kindZTIC + kindCode + objZTIC + objCode
```

- **Namespace / ZTIC**: every namespace (e.g. `131131/21`, the "base" namespace) resolves to a short numeric code — a **ZTIC** — via `svr1.getCodeForNS(dbZtI_id, namespaceString)`. Objects and links reference each other by ZTIC+code pairs rather than by namespace strings, for compactness.
- **In-memory index**: on startup the server loads all objects/links/element-values/type-values from MongoDB into flat arrays (`svr1.ZtObject_AR`, `ZtObjectLink_AR`, `ZtObjectElement_AR`, `ZtObjectTypeValue_AR`) plus a `HashMap` (`svr1.ZtObject_idx_HM`) keyed by the compound key string above for O(1) lookup. Most business logic is graph traversal over these arrays (walking `linkIdx_AR` to find linked objects, filtered by link-type code and an effective-dated `timestamp`).
- **Templates & technical profiles**: an object kind has a template; a template links to one or more "technical profiles," which link to the actual object-element definitions. Resolving "what fields does this object have" means walking kind → template → technical profile(s) → object elements (see `getOEvalueIdxForTemplateDef` / `getTechnicalProfileIdx_AR_ForTemplateDef` in `server/zt_server_object.js`).
- **Runtime/patch-level resolution**: classes (programs) are assigned to exactly one "runtime profile component" via a set membership check, and each component maps to a patch level — this is how `zt_server_class.js`'s `getRuntimePatchLevelIdxForMessage` picks which code path/version to run for a given message.
- **Effective dating**: nearly every lookup takes a `timestampx` and filters candidates by `timestamp <= timestampx`, then picks the most recent — this is the pattern for "what was true as of this point in time," used throughout links, templates, and type values.
- **Messages**: client and server communicate by building/parsing structured "messages" (`zt_*_message.js`, `zt_*_message_parse.js`, `zt_*_message_builder.js`) that carry raw segment/element arrays (`ZtRawMessageAR`, `msgZTIC_Array`) which get resolved into ZTIC codes against the loaded namespace domain (`ZTICDomain`). `POST /zt/process_message` is the single generic entry point the server uses to interpret these.
- **Validation**: cross-cutting validation rules (e.g. `server/zt_server_validation_links.js`, `zt_server_validation_key_of_queried_object.js`) run against a message's work-area arrays and push failure status/log entries onto the message rather than throwing.

### Bootstrapping data
New deployments/namespaces are bootstrapped by importing "record format" text files (`client/file_import/RecFormatFileList--*.txt`) through `/zt/file_import` — these define the base object kinds, software/app objects, and are the seed data for everything else. `notes/adding_new_instance_id_to_server.txt` documents the manual steps to add a new namespace/instance (edit `.env` startup params, then add the namespace to dropdowns in `zt_maintain_object.html`, `zt_file_import.html`, `zt_query.html`, and the admin console).

### `zt_server_patch_0000N/` directories
These hold versioned overrides/extensions of specific classes (e.g. `..._server_query.js`, `..._server_code_increment_class.js`) tied to a runtime patch level, per the patch-level resolution mechanism above — not general-purpose patch files.

## Conventions specific to this repo

- Commit messages are a bare sequential integer (e.g. `10001`, `10002`, incrementing by one each commit) — see `notes/github_instructions`. Match this style if asked to commit.
- Inline comments are frequently dated (`// 20230221`) to mark when a line was added/changed, and dead code is often commented out with a `//(del) <date>` marker rather than deleted. Follow this pattern when editing these files rather than silently removing old code.
- `node_modules/` is committed directly to the repo (no `.gitignore`) — don't be surprised by it in `git status`/diffs.
