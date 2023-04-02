FROM httpd:2.4
COPY ./out/html/ /usr/local/apache2/htdocs/
