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
        $staticRoute = ["home", "articles"];

        $dynamicRoute = [
            ["route" => "article", "model" => "Article",  "attr" => "slug"],
            ["route" => "article/edit", "model" => "Article", "attr" => "slug"]
        ];

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

            $model = "App\\Models\\".$dynamicRoute[$i]["model"];
            $model = new $model();
            $data = $model->all();
            foreach($data->toArray() as $row){
                $attr = $dynamicRoute[$i]["attr"];

                fwrite($myfile, "\t<url>\n");
                fwrite($myfile, "\t\t<loc>https://".$_SERVER['HTTP_HOST']."/".$dynamicRoute[$i]["route"]."/".$row->$attr."</loc>\n");
                fwrite($myfile, "\t\t<lastmod>".date("Y-m-d")."</lastmod>\n");
                fwrite($myfile, "\t\t<changefreq>monthly</changefreq>\n");
                fwrite($myfile, "\t\t<priority>0.8</priority>\n");
                fwrite($myfile, "\t</url>\n");
            }
        }
        fwrite($myfile, "</urlset>");
        fclose($myfile);

    }

}
