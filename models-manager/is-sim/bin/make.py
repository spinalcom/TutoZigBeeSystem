from concat_js import *
import sys

if len(sys.argv) == 1:
    relative_path = ""
else:
    relative_path = sys.argv[1]

models = []
views = []
stylesheets = []

for p in os.listdir( relative_path + "modules" ):
    for m in os.listdir(relative_path + "modules/" + p):
	if m == "models":
	    models.append(relative_path + "gen/" + m + "/" + p + ".js")
            concat_js(relative_path + "modules/" + p + "/" + m, relative_path + "gen/" + m + "/" + p + ".js", relative_path + "gen/stylesheets/" + p + ".css" )

	elif m == "views":
	    views.append(relative_path + "gen/" + m + "/" + p + ".js")
            concat_js(relative_path + "modules/" + p + "/" + m, relative_path + "gen/" + m + "/" + p + ".js", relative_path + "gen/stylesheets/" + p + ".css" )

	elif m == "stylesheets":
	    stylesheets.append(relative_path +"gen/" + m + "/" + p + ".css")
            concat_js(relative_path + "modules/" + p + "/" + m, relative_path + "gen/" + m + "/" + p + ".js", relative_path + "gen/stylesheets/" + p + ".css" )

    #for r in get_files( "modules/" + p ):
     #   print r.name
      #  if r.name.endswith( ".html" ):
       #     exec_cmd( "cp " + r.name + " ." )


exec_cmd( "echo > " + relative_path + "is-sim.models.js " )
exec_cmd( "echo > " + relative_path + "is-sim.views.js " )
exec_cmd( "echo > " + relative_path + "is-sim.stylesheets.css " )

for m in sorted(models):
    exec_cmd( "cat " + relative_path + "is-sim.models.js " + m + " > " + relative_path + "is-sim.models_tmp.js" )
    exec_cmd( "mv " + relative_path + "is-sim.models_tmp.js " + relative_path + "is-sim.models.js" )
    #exec_cmd( "mkdir -p min; slimit -m < gen/" + o + " > min/" + o )
for v in sorted(views):
    exec_cmd( "cat " + relative_path + "is-sim.views.js " + v + " > " + relative_path + "is-sim.views_tmp.js" )
    exec_cmd( "mv " + relative_path + "is-sim.views_tmp.js " + relative_path + "is-sim.views.js" )
for s in sorted(stylesheets):
    exec_cmd( "cat " + relative_path + "is-sim.stylesheets.css " + s + " > " + relative_path + "is-sim.stylesheets_tmp.css" )
    exec_cmd( "mv " + relative_path + "is-sim.stylesheets_tmp.css " + relative_path + "is-sim.stylesheets.css" )



