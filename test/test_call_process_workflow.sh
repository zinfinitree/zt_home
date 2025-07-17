a=0
while [ $a -lt 3 ]
do
   echo $a
   a=`expr $a + 1`
   node test_call_process_workflow
   sleep 10
done
