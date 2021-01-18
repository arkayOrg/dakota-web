require 'yaml'
require 'fileutils'

module SiteData
  class Achievements
    def initialize(site)
      @site = site
      @basepath = Dir.pwd
    end

    def generate
      count = 0

      Dir.glob(File.join(@basepath, '_data', 'achievements', '*.yml')) do |yml_filename|
        achievement = YAML.load_file(yml_filename)

        title = achievement['title'].strip
        title = "\"#{title}\"" if title =~ /(:|-)/

        output = "---\n"
        output << "key: #{achievement['key']}\n"
        output << "layout: achievement\n"
        output << "title: #{title}\n"
        output << "focus_area: #{achievement['focus_area']}\n" if achievement['focus_area']
        output << "center: #{achievement['center']}\n" if achievement['center']
        output << "date: #{achievement['date']}\n"
        output << "img: #{achievement['img']}\n" if achievement['img']
        output << "learn_more_link: #{achievement['learn_more_link']}\n" if achievement['learn_more_link']
        output << "description: #{achievement['description']}\n" if achievement['description']
        output << "---\n"

        if achievement['learn_more_link']
          output << "<p><a target=\"_blank\" href=\"{{ page.learn_more_link }}\">Learn more</a></p>"
        else
          output << "<h2><a href=\"site.baseurl/centers/TBD\">{{ page.center }}</a></h2>\n"
          output << '<p>{{ page.date | date: "%B %d, %Y" }}</p>'
          output << "\n<p><strong><a href=\"site.baseurl/centers/focus-area/{{ page.focus_area | slugify }}\">{{ page.focus_area }}</a></strong></p>\n\n"
          output << achievement['content']
        end

        mdfilename = File.basename(yml_filename).sub('.yml', '.md')

        File.write(
          File.join(@basepath, '_achievements', mdfilename),
          output.gsub('site.baseurl', @site.baseurl),
          mode: "w"
        )

        count += 1
      end

      if count == 1
        puts "   1 achievement generated."
      else
        puts "   #{count} achievements generated."
      end
    end
  end
end
