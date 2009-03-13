<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
        "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head>
<title>APE Animation</title>
<link type="text/css" rel="stylesheet" href="../../resources/ape.css"/>

</head>

<body>

<h1>Animation Examples</h1>

<h2>Package</h2>
<p>

    Package <a href="../../build/anim/anim.js">anim.js</a> is composed of 
    <a href="../../build/anim/Animation.js">Animation.js</a>
    and <a href="../../build/anim/StyleTransition.js">StyleTransition.js</a>.
</p>

<pre>
anim.js:

    Animation
            |
            + StyleTransition
</pre>

<p>
    <code>Animation</code> is purely a timing mechanism. To acheive CSS transition effects, 
    use <code>StyleTransition</code>.
</p>

<h2>Required Files</h2>
<p><code>StyleTransition</code> requires:
</p>

<ul>
	<li>
		<a href="../../build/dom/style-f.js">style-f.js</a> &mdash; <kbd>style-f.js</kbd> is included in 
		<a href="../../build/dom/dom.js">dom.js</a> (which is included in 
		<a href="../../build/dom/ape-ep-dom.js">ape-ep-dom.js</a>).
	</li>
	<li> <a href="../../build/color/ColorRGB.js">ColorRGB.js</a> &mdash; only required for color transitions <li>
</ul>

<h2>Examples</h2>
<ul>
    <li><a href="transition.html">toggle( );</a></li>
    <li><a href="animation-test.html">Transitions</a> - time based transitions</li>

    <li><a href="seekTo.html">seekTo( position )</a></li>
    <li><a href="clip.html">clip</a> StyleTransition - working with css clip: rect( )</li>
    <li><a href="animation-rule-test.html">animation on a css rule</a></li>
</ul>

<h2>Tutorial Overview</h2>
<p>
    First create an element in the HTML.

</p>
<pre>
&lt;div id="testNode" style="color: #9f7; background-color: #010;"&gt;change me&lt;/div&gt;
</pre>
<p>
    (The styles do not need to be in an inline <code>style</code> attribute.)
</p>

<p>
    Next, create a StyleTransition:

</p>

<pre>
&lt;script type='text/javascript&gt;
var newStyle = { 
    color: "#600",
    backgroundColor: "#f53"
};

var anim = new APE.anim.StyleTransition(
    "testNode",
    newStyle,
    2, 
    APE.anim.Transitions["accel"]);
&lt;/script&gt;
</pre>

<jsp:include page="/ape/nav.jsp"/>

</body>
</html>