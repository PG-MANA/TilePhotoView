require 'fileutils'
require 'rmagick'

module Jekyll
  class ScenePagesGenerator < Generator
    safe true

    def generate(site)
      scene_page_list = []
      site.data['scene']['scenes'].each do |scene|
        if site.data[scene].length == 0 then
          next
        end
        num_of_entries = site.data['scene']['entries_per_pages']
        num_of_pages = (site.data[scene].length - 1) / num_of_entries
        (0..num_of_pages).each do |i|
          site.pages << ScenePage::new(site, site.source, 'scene', scene, site.data[scene].slice(i * num_of_entries, num_of_entries), i, num_of_pages, scene_page_list)
        end
      end
      site.pages << SceneSitemap::new(site, site.source, 'sitemap', 'scene.xml', scene_page_list)
    end
  end

  class ScenePage < Page
    def initialize(site, base, dir, scene_name, entries, current_number, num_of_pages, scene_page_list)
      @site = site
      @base = base
      @dir = dir
      if num_of_pages > 0 and current_number != 0
        @name = "#{scene_name}#{current_number + 1}.html"
      else
        @name = "#{scene_name}.html"
      end

      scene_page_list << { 'url' => File.join(dir, @name), 'priority' => 0.8, 'changefreq' => 'weekly' }

      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), 'scene.html')
      self.data['title'] = scene_name
      self.data['scene'] = scene_name
      entries.each do |e|
        if e['image_large_width'] == nil or e['image_large_height'] == nil or e['image_small'] == nil
          img = Magick::Image::read(File.join(@base, 'assets', 'images', 'upload', e['image_large'])).first
          if img.orientation == Magick::LeftTopOrientation or
            img.orientation == Magick::RightTopOrientation or
            img.orientation == Magick::RightBottomOrientation or
            img.orientation == Magick::LeftBottomOrientation
            e['image_large_width'] = img.rows
            e['image_large_height'] = img.columns
          else
            e['image_large_width'] = img.columns
            e['image_large_height'] = img.rows
          end

          if e['image_small'] == nil
            image_small_dir = File.join(File.dirname(e['image_large']), 'thumbnail')
            image_small_file_name = File.basename(e['image_large'])
            asset_thumb_rel_dir_path = File.join('assets', 'images', 'upload', image_small_dir)
            asset_thumb_abs_dir_path = File.join(site.dest, asset_thumb_rel_dir_path)
            asset_thumb_abs_file_path = File.join(asset_thumb_abs_dir_path, image_small_file_name)

            e['image_small'] = File.join(image_small_dir, image_small_file_name)
            unless File.exist?(asset_thumb_abs_file_path)
              FileUtils.mkdir_p(asset_thumb_abs_dir_path)
              img.resize_to_fit(site.data['scene']['thumbnail_size'] || 800).write(asset_thumb_abs_file_path)
              site.keep_files << File.join(asset_thumb_rel_dir_path, image_small_file_name)
            end
          end
        end
      end
      self.data['entries'] = entries
      if num_of_pages > 0
        self.data['current_page_number'] = current_number + 1
        self.data['max_page_number'] = num_of_pages + 1
      end
    end
  end

  class SceneSitemap < Page
    def initialize(site, base, dir, name, scene_page_list)
      @site = site
      @base = base
      @dir = dir
      @name = name

      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), 'scene_sitemap.xml')
      self.data['entries'] = scene_page_list
    end
  end
end
