Jekyll::Hooks.register :site, :after_init do |site|
  puts "--------------------"
  puts "Building achievements..."
  achievements = SiteData::Achievements.new(site)
  achievements.generate
end
