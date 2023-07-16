<?php
namespace App\Controllers;

class Sitemap {

    public function index(){
        

            
        $this->generateSitemap();

        if(!file_exists("./sitemap/sitemap.xml")){
            echo "file does not exist";
            return;
        }


        $sitemap = file_get_contents("./sitemap/sitemap.xml");

        
        header("Content-type: text/xml");
        echo $sitemap;
        return;
    }


    private function generateSitemap(){
        $staticRoute = ["login", "register"];

        $dynamicRoute = [];

        $pages = \App\Models\Page::all()->toArray();

        foreach($pages as $page){

            $slug = $page->getSlug();
            if($page->getParentSlug() != null){
                $slug = $page->getParentSlug()."/".$slug;
            }

            if($slug == "/") $slug = "";
            
            array_push($dynamicRoute, [$slug => $page->getUpdatedAt()]);
        }


        $myfile = fopen("./sitemap/sitemap.xml","w");
        fwrite($myfile, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        fwrite($myfile, "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
        for($i = 0; $i < count($staticRoute); $i++){
            fwrite($myfile, "\t<url>\n");
            fwrite($myfile, "\t\t<loc>https://".$_SERVER['HTTP_HOST']."/".$staticRoute[$i]."</loc>\n");
            fwrite($myfile, "\t\t<lastmod>".date("Y-m-d")."</lastmod>\n");
            fwrite($myfile, "\t\t<changefreq>monthly</changefreq>\n");
            fwrite($myfile, "\t\t<priority>0.8</priority>\n");
            fwrite($myfile, "\t</url>\n");
        }

        for($i = 0; $i < count($dynamicRoute); $i++){
            foreach($dynamicRoute[$i] as $key => $value){
                fwrite($myfile, "\t<url>\n");
                fwrite($myfile, "\t\t<loc>https://".$_SERVER['HTTP_HOST']."/".$key."</loc>\n");
                fwrite($myfile, "\t\t<lastmod>".$value->format("Y-m-d")."</lastmod>\n");
                fwrite($myfile, "\t\t<changefreq>monthly</changefreq>\n");
                fwrite($myfile, "\t\t<priority>0.5</priority>\n");
                fwrite($myfile, "\t</url>\n");
            }
        }

        
        fwrite($myfile, "</urlset>");
        fclose($myfile);

    }

}
