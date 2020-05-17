FROM    rackspacedot/python37
COPY    ./dist/ /website-dist/
CMD     python3 -m http.server --directory=website-dist 80
