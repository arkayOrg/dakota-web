require 'yaml'
require 'fileutils'

module SiteData
  class Achievements
    def initialize(site)
      @site = site
      @basepath = Dir.pwd
    end

    def generate
      Dir.glob(File.join(@basepath, '_data', 'achievements', '*.yml')) do |yml_filename|
        achievement = YAML.load_file(yml_filename)

        title = achievement['title'].strip
        title = "\"#{title}\"" if title =~ /(:|-)/

        output = "---\n"
        output << "key: #{achievement['key']}\n"
        output << "layout: achievement\n"
        output << "title: #{title}\n"
        output << "focus_area: #{achievement['focus_area']}\n"
        output << "center: #{achievement['center']}\n"
        output << "date: #{achievement['date']}\n"
        output << "img: #{achievement['img']}\n"
        output << "---\n"
        output << "<h2><a href=\"site.baseurl/centers/TBD\">{{ page.center }}</a></h2>\n"
        output << '<p>{{ page.date | date: "%B %d, %Y" }}</p>'
        output << "\n<p><strong><a href=\"site.baseurl/centers/focus-area/{{ page.focus_area | slugify }}\">{{ page.focus_area }}</a></strong></p>\n\n"
        output << achievement['content']

        mdfilename = File.basename(yml_filename).sub('.yml', '.md')

        File.write(
          File.join(@basepath, '_achievements', mdfilename),
          output.gsub('site.baseurl', @site.baseurl),
          mode: "w"
        )
      end
    end
  end
end
