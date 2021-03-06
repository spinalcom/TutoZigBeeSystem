# Copyright 2012 Structure Computation  www.structure-computation.com
# Copyright 2012 Hugo Leclerc
#
# This file is part of Soda.
#
# Soda is free software: you can redistribute it and/or modify
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
class Element_HexahedraList extends Element
    constructor: ->
        super()
        
        @add_attr
            indices: new TypedArray_Int32 [ 8, 0 ]
      
    draw_gl: ( info, mesh, points, is_a_sub ) ->
    draw: ( info, mesh, proj, is_a_sub ) ->
            
    draw_gl: ( info, mesh, points, is_a_sub ) ->
    
    _get_indices: () ->
        return @indices