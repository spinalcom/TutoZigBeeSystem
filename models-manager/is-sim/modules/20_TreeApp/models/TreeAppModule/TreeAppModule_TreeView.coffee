# Copyright 2015 SpinalCom  www.spinalcom.com
#
# This file is part of SpinalCore.
#
# SpinalCore is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Soda is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
# You should have received a copy of the GNU General Public License
# along with Soda. If not, see <http://www.gnu.org/licenses/>.



#
class TreeAppModule_TreeView extends TreeAppModule
    constructor: ->
        super()
        
        @name = 'Tree View'
        @visible = false
        
        _ina = ( app ) =>
            app.data.focus.get() != app.treeview.process_id
        
        _ina_cm = ( app ) =>
            app.data.focus.get() != app.selected_canvas_inst()?[ 0 ]?.cm.process_id and 
            app.data.focus.get() != app.treeview.process_id
            
        
        lst_equals = ( a, b ) ->
            if a.length != b.length
                return false
            for va, ia in a
                if va != b[ ia ]
                    return false
            return true
                
        up_down_fun = ( evt, app, inc ) ->
            #alert "test"
            items = app.data.selected_tree_items
            session = app.data.selected_session()
            if items.length == 0
                app.data.selected_tree_items.clear()
                app.data.selected_tree_items.push [ session ]
            else if items.length == 1
                #first search position of current selected item
                flat = app.layouts[ session.model_id ]._pan_vs_id.TreeView.treeview.flat
                for f, i in flat
                    if i + inc >= 0 and i + inc < flat.length and lst_equals( items[ 0 ], f.item_path )
                        app.data.selected_tree_items.clear()
                        app.data.selected_tree_items.push flat[ i + inc ].item_path
                        break
    
        @actions.push
            txt: ""
            key: [ "UpArrow" ]
            ina: _ina
            fun: ( evt, app ) =>
                up_down_fun evt, app, -1         

        @actions.push
            txt: ""
            key: [ "DownArrow" ]
            ina: _ina
            fun: ( evt, app ) =>
                up_down_fun evt, app, 1

        @actions.push
            txt: ""
            key: [ "LeftArrow" ]
            ina: _ina
            fun: ( evt, app ) =>
                # Close selected items
                items = app.data.selected_tree_items
                for item in items
                    close = @is_close app, item
                    if item[ item.length - 1 ]._children.length > 0 and close == false
                        @add_item_to_close_tree app, item
                            
        @actions.push
            txt: ""
            key: [ "RightArrow" ]
            ina: _ina
            fun: ( evt, app ) =>
                # Open selected items
                items = app.data.selected_tree_items
                for item in items
                    close = @is_close app, item
                    if item[ item.length - 1 ]._children.length > 0 and close == true
                        @rem_item_to_close_tree app, item
                    
        @actions.push
            txt: ""
            key: [ "Enter" ]
            ina: _ina
            fun: ( evt, app ) =>
                # Show/hide items
                path_items = app.data.selected_tree_items
                for path_item in path_items
                    item = path_item[ path_item.length - 1 ]
                    if item._viewable?.get()
                        for p in app.data.selected_canvas_pan
                            app.data.visible_tree_items[ p ].toggle item
                            
                            
        @actions.push
            txt: "Save"
            key: [ "" ]
            ina: _ina
            ico: "img/save_24.png"
            #loc: true
            fun: ( evt, app ) =>
                items = app.data.selected_tree_items
                for path_item in items
                    item = path_item[ path_item.length - 1 ]
                    console.log "saving : ", item
                    if FileSystem? and FileSystem.get_inst()?
                        fs = FileSystem.get_inst()
                        # we should ask for filename and path
                        name = item.to_string()
                        fs.load_or_make_dir "/home/monkey/test_browser", ( d, err ) =>
                            d.add_file name, item, model_type: "TreeItem"
                            
                            
        @actions.push
            txt: "Delete current tree item"
            ico: "img/trash_24.png"
            key: [ "Del" ]
            ina: _ina
            #loc: true
            fun: ( evt, app ) =>
                for path in app.data.selected_tree_items
                    #prevent deleting root item (session)
                    if path.length > 1
                        m = path[ path.length - 1 ]
                        if m instanceof DisplaySettingsItem #prevent deleting display settings item
                            return true
                        else if m instanceof ViewItem
                            modules = app.data.modules
                            for mod in modules 
                                if mod instanceof TreeAppModule_PanelManager
                                    mod.actions[ 4 ].fun evt, app
                        else
                            app.undo_manager.snapshot()
                            path[ path.length - 2 ].rem_child m
                            app.data.delete_from_tree m
                            app.data.selected_tree_items.clear()
                            
        
    is_close: ( app, item ) ->
        for closed_item_path in app.data.closed_tree_items
            if item.equals closed_item_path
                return true
        return false
    
    add_item_to_close_tree: ( app, item ) ->
        app.data.close_item item
        
    rem_item_to_close_tree: ( app, item ) ->
        app.data.open_item item