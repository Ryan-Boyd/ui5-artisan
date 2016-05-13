# ui5-artisan
Command Line Tools for constructing UI5 apps 

Inspired by Laravel's artisan CL tool and Apple's Visual Format Language

## how to install

1. make sure npm and node is installed
2. clone project into target folder
3. cd into target folder
4. run npm install
5. run npm link
6. contribute!

## how to use
```
 $ ui5 -h help
 $ ui5 -V version
 $ ui5 -c -controller [name] set controller and/or name.
 $ ui5 -v -view [name] [type] set view and/or name. specify type of view. default is xml (js|xml)
 $ ui5 -b -builder <templatingEngine> [name] [type] set view and/or name. specify type of view. default is xml (js|xml)
```
## templating key (under construction)
### meta keys
[ ≈ begin template

] ≈ end template

\- ≈ whitespace character (must use between elements[unless aggregated])

### objects
sf ≈ simple form

f ≈ form

oh ≈ object header

t or tm ≈ sap.m.table

tui ≈ sap.ui.table

sf ≈ simple form

itb ≈ icon tab bar

p ≈ panel

l ≈ label

i ≈ input

tx ≈ text

cb ≈ combobox

### modifiers

t3, itb4, l4 ≈ add number after a template key to create multiples or add number of aggregations

## template examples
```
$ ui5 -b [-oh-psf2-cb-t-]
```
creates object header, panel with 2 simple forms enclosed, combo box, and mobile table
