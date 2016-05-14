# ui5-artisan
Command Line Tools for constructing UI5 apps 

Inspired by Laravel's [artisan CL tool](https://laravel.com/docs/5.2/artisan) and Apple's [Visual Format Language](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/VisualFormatLanguage.html)

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
## templating key

// ≈ still needs to be added

### basic
[ ≈ begin template

] ≈ end template

\- ≈ whitespace character (must use between elements[unless aggregated])

### objects
sf ≈ simple form

//f ≈ form

oh ≈ object header

//t or tm ≈ sap.m.table

//tui ≈ sap.ui.table

//itb ≈ icon tab bar

//p ≈ panel

### modifiers

These must prefix a number (1-infinity) determing how many to be created

l ≈ label/input pair

x ≈ checkbox

b ≈ button

## template examples
```
$ ui5 -b [-oh-psfl2x1b1-b1-t-]
```
creates object header, panel with simple form and 2 label/input pairs, checkbox, and button enclosed, button, and mobile table
