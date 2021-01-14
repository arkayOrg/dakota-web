module Jekyll
  module BaseUrlFilter
    def baseurl(input)
      return "" if input.nil?
      input.gsub('site.baseurl', @context.registers[:site].baseurl)
    end
  end
end

Liquid::Template.register_filter(Jekyll::BaseUrlFilter)
