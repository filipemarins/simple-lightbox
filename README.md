# Simple Lightbox

This is a experimental lightbox plugin. Will automatically add a modal for `<ìmg>` tags, and you can navigate for each img as a gallery.

## Getting Started

To use this plugin it is simple, you just need to import the js and make a instace of the object, like the examble bellow:

```html
<script src="lightbox.js"></script>
<script>
  new Lightbox(true);
</script>
```

You can instance the object with true/false, default value is false.

if ```new Lightbox(false)```, you will have to add mannualy the attribute ``[data-lightbox]`` for each image tag that you want be a lightbox.

if ```new Lightbox(true)```, will automatically add all the `<img>` tags to lightbox.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Author

* **Filipe Marins** - *Initial work* - [Github](https://github.com/filipemarins)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
