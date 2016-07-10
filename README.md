# ui5-artisan
Command Line Tools for constructing UI5 apps 

Inspired by [Laravel's Artisan CL tool](https://laravel.com/docs/5.2/artisan), [Apple's Visual Format Language](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/VisualFormatLanguage.html), and [SAP Fiori's Design Guidelines](https://experience.sap.com/fiori-design-web/foundation/design-principles/)

<b><em>Simple | Adaptive | Coherent | Delightful | Role-Based</em></b>
## how to install

1. make sure npm and node is installed
2. clone project into target folder
3. cd into target folder
4. run npm install
5. run npm link
6. contribute!

## how to use
```
 $ ui5 -h --help
 $ ui5 -V --version
 $ ui5 -s --scaffold <project name> [name space] create a new UI5 Project
 $ ui5 -v --view [name] [name space] [type] make view. optional file type. default is xml (xml|js)
 $ ui5 -c --controller [name] [name space] make controller
 $ ui5 -vc --viewController [name] [name space] [type] make view and controller. optional file type. default is xml (xml|js)
 $ ui5 -b --builder <template engine> [name] create a custom xml view template
```

`ui5 -s` creates a new project folder

`ui5 -v`,`ui5 -c`,`ui5 -vc` creates views/controllers in current working directory
