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

      achievements = YAML.load_file(File.join(@basepath, '_data', 'achievements.yml'))

      achievements.each do |achievement|
        yml_filename = achievement['key']

        title = achievement['title'].strip
        title = "\"#{title}\"" if title =~ /(:|-)/

        # For front matter values, "site.baseurl" needs to be the acutal baseurl (@site.baseurl),
        # but for the content, "site.baseurl" needs to be "{{ site.baseurl }}".  The point is to
        # do these conversions here; this way, the process that creates/updates the YAML doesn't
        # need to mind the difference, just output "site.baseurl"

        # Front matter
        output = "---\n"
        output << "key: #{achievement['key']}\n"
        output << "layout: achievement\n"
        output << "title: #{title}\n"
        output << "focus_area: #{achievement['focus_area']}\n" if achievement['focus_area']
        output << "category: #{slugify('focus-' + achievement['focus_area'])}\n" if achievement['focus_area']
        output << "center: #{achievement['center']}\n" if achievement['center']
        output << "date: #{achievement['date']}\n"
        output << "img: #{achievement['img']}\n" if achievement['img']
        output << "learn_more_link: #{achievement['learn_more_link']}\n".gsub('site.baseurl', @site.baseurl) if achievement['learn_more_link']
        output << "description: \"#{achievement['description']}\"\n" if achievement['description']
        output << "index_description: #{achievement['index_description']}\n" if achievement['index_description']
        output << "permalink: /centers/achievements/#{achievement['key']}/\n"
        output << "---\n"

        # Content
        if achievement['learn_more_link']
          output << "<p><a target=\"_blank\" href=\"{{ page.learn_more_link }}\">Learn more</a></p>"
        else
          output << "<h2><a href=\"{{ site.baseurl }}/centers/TBD\">{{ page.center }}</a></h2>\n"
          output << '<p>{{ page.date | date: "%B %d, %Y" }}</p>'
          output << "\n<p><strong><a href=\"{{ site.baseurl }}/centers/focus-area/{{ page.focus_area | slugify }}\">{{ page.focus_area }}</a></strong></p>\n\n"
          output << achievement['content'].gsub('site.baseurl', '{{ site.baseurl }}')
        end

        File.write(
          File.join(@basepath, '_achievements', "#{yml_filename}.md"),
          output,
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

    private

    def slugify(str)
      str.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
    end
  end
end
