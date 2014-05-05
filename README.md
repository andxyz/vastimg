# vastimg: fullscreen pixely gifs

## Dear enduser,

http://vastimg.andxyz.com/

Hit '?' for advanced usage.

## Dear developer,

we longer do we need to run redis-server
we added dgram for udp packet sending client side
sidenote: we removed your zen and filled this app with crap

```bash
    npm install
    bundle install
    lessc style.less style.css
    browserify vastimg.js > vastimg.bundled.js
```

## Dear serveradmin,


```zsh
    ssh merehuman@vastimg.andxyz.com
    cd /www/
    git clone https://github.com/andxyz/vastimg.git vastimg
    cd vastimg/
    PATH=$PATH:./bin/ foreman start
```

## example usage once it's running

- http://0.0.0.0:5000/?http://thechive.files.wordpress.com/2010/11/oprah-bees.gif
- http://0.0.0.0:5000/?https://31.media.tumblr.com/7f65d6833ee895dc2bb1293ac5a4c313/tumblr_mstlaoryMO1rv9fs1o1_500.gif
- http://0.0.0.0:5000/?http://0.media.collegehumor.cvcdn.com/62/46/cefeebdd838f92b7d8967eb854eb7bb1.gif
