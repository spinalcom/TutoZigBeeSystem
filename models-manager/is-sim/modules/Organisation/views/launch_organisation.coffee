#clear page
USER_EMAIL = ""

load_if_cookie_organisation = () ->
    if Cookies.set("email") and Cookies.set("password")
        email = Cookies.set("email")
        password = Cookies.set("password")
        USER_EMAIL = email
        
        xhr_object = FileSystem._my_xml_http_request()
        xhr_object.open 'GET', "../get_user_id?u=#{encodeURI email}&p=#{encodeURI password}", true
        xhr_object.onreadystatechange = ->
            if @readyState == 4 and @status == 200
                lst = @responseText.split " "
                user_id = parseInt lst[ 0 ]
                if user_id > 0
                    #launch_ecosystem_mecanic user_id, decodeURIComponent lst[ 1 ].trim()
                    launch_organisation user_id, decodeURIComponent lst[ 1 ].trim()
                else
                    window.location = "login.html" 
                    
                
        xhr_object.send()
    
    else   
        window.location = "login.html" 
              
        
        
# launch_organisation = ( userid, home_dir, main = document.body ) ->
launch_organisation = ( main = document.body ) ->
    MAIN_DIV = main
    
    #load or create config file
    FileSystem._home_dir = "__users__/root"
    FileSystem._userid   = "1657"
    FileSystem._password = "4YCSeYUzsDG8XSrjqXgkDPrdmJ3fQqHs"
    bs = new BrowserState
    fs = new FileSystem
    config_dir = FileSystem._home_dir + "/__config__" 
    
    fs.load_or_make_dir config_dir, ( current_dir, err ) ->
        config_file = current_dir.detect ( x ) -> x.name.get() == ".config"
        if not config_file?
            alert "no config !"
            window.location = "desk.html"  
        else
            config_file.load ( config, err ) =>
                create_organisation_view config, main

                 
    
create_organisation_view = ( config, main = document.body ) ->
    
    #login bar
    login_bar = new LoginBar main, config
    
    #desk organisation
    organisation_data = new OrganisationData config
    organisation_desk = new OrganisationView main, organisation_data
    
    
  
    
    
    
    

    
    


