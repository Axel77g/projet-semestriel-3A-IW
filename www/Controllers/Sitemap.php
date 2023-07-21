<?php

namespace App\Controllers;

class Sitemap
{

    public function index()
    {

        

        $sitemap = Sitemap::generateSitemap();

        header("Content-type: text/xml");
        echo $sitemap;
        return;
    }


    private static function generateSitemap()
    {
        $staticRoute = ["login", "register", ""];

        $dynamicRoute = [];

        $pages = \App\Models\Page::all()->toArray();

        foreach ($pages as $page) {

            $slug = $page->getPath();

            array_push($dynamicRoute, [$slug => $page->getUpdatedAt()]);
        }

       $sitemap = "";

        
        $sitemap .= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $sitemap .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

        for ($i = 0; $i < count($staticRoute); $i++) {
             $sitemap .= "\t<url>\n";
             $sitemap .= "\t\t<loc>http://" . $_SERVER['HTTP_HOST'] . "/" . $staticRoute[$i] . "</loc>\n";
             $sitemap .= "\t\t<lastmod>" . date("Y-m-d") . "</lastmod>\n";
             $sitemap .= "\t\t<changefreq>monthly</changefreq>\n";
             $sitemap .= "\t\t<priority>0.8</priority>\n";
             $sitemap .= "\t</url>\n";
        }

        for ($i = 0; $i < count($dynamicRoute); $i++) {
            foreach ($dynamicRoute[$i] as $key => $value) {
                 $sitemap .= "\t<url>\n";
                 $sitemap .= "\t\t<loc>http://" . $_SERVER['HTTP_HOST'] . $key . "</loc>\n";
                 $sitemap .= "\t\t<lastmod>" . $value->format("Y-m-d") . "</lastmod>\n";
                 $sitemap .= "\t\t<changefreq>monthly</changefreq>\n";
                 $sitemap .= "\t\t<priority>0.5</priority>\n";
                 $sitemap .= "\t</url>\n";
            }
        }


         $sitemap .= "</urlset>";
        return $sitemap;
    }
}
