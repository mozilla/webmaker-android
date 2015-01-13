# Animations

Animations from [animate.css](http://daneden.github.io/animate.css) are available in this project.

You can use them directly in html, like this:

```html
<div id="foo" class="animated fadeIn">
    ...
</div>
```

or in a `.less` file, like this:

```css
#foo {
    .animated;
    .fadeIn;
}
```

### Customizing delay or duration

Let's say you want to have three items animate in at different speeds. You can modify any of the properties of the default animations like this:

```html
<span id="a">Hello</span>
<span id="b">World</span>
<span id="c">Foo</span>
```

```css
#a, #b, #c {
    .animated;
    .fadeInDown;
}
#b {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}
#c {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

```
