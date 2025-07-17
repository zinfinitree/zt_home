K=~/backup/backup_/`date +%Y%m%d`
K=./backup/zt_backup_`date +%Y%m%d`
mkdir  -p "$K"
cp -r ./server "$K"
cp -r ./client "$K"
cp -r ./notes "$K"
cp -r ./data "$K"
cp -r ./email/gmail-api-nodejs-app/*.js "$K"
cp -r ./email/gmail-api-nodejs-app/*.env* "$K"
cp -r ./email/gmail-api-nodejs-app/*.sh "$K"

cp Docker*.* "$K"
cp docker*.* "$K"
cp package*.* "$K"
cp ds2*.* "$K"
cp *.sh "$K"
echo $K

