from concat_js import *

processes = []
stylesheets = []

for p in os.listdir( "modules" ):
    for m in os.listdir("modules/" + p):
        if m == "views":
            processes.append("gen/" + m + "/" + p + ".js")
            concat_js( "modules/" + p + "/" + m, "gen/" + m + "/" + p + ".js", "gen/stylesheets/" + p + ".css" )

        elif m == "stylesheets":
            stylesheets.append("gen/" + m + "/" + p + ".css")
            concat_js( "modules/" + p + "/" + m, "gen/" + m + "/" + p + ".js", "gen/stylesheets/" + p + ".css" )

exec_cmd( "echo > processes.js " )
exec_cmd( "echo > stylesheets.css " )

for v in sorted(processes):
    exec_cmd( "cat processes.js " + v + " > processes_tmp.js" )
    exec_cmd( "mv processes_tmp.js processes.js" )
for s in sorted(stylesheets):
    exec_cmd( "cat stylesheets.css " + s + " > stylesheets_tmp.css" )
    exec_cmd( "mv stylesheets_tmp.css stylesheets.css" )

exec_cmd( "cp modules/Admin/admin.html ../" )
exec_cmd( "cp modules/Desk/desk.html ../" )
exec_cmd( "cp modules/Lab/lab.html ../" )
