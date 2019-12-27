copy_and_paste = <<~NAMES
1 Introduction Not completed
2 jQuery Event Delegation Not completed
3 Assignment Managing Collections Not completed
4 HTML Templating Not completed
5 Practice Problems Handlebars Basics Not completed
6 Managing Collections with Handlebars Not completed
7 AJAX Requests Not completed
8 Introduction and Server Setup Not completed
9 Part 1 - Fetch Data and Render on Page Load Not completed
10 Part 2 - Slide Show Not completed
11 Part 3 - Like Favorite and Comment Not completed
12 More Exercises Not completed
NAMES

require 'fileutils'

def generate_file_names(copies)
  copies.split(/\s+Not completed\n/).each do |folder|
    FileUtils.mkdir(p folder.gsub(/\s+/, '_'))
  end
end

generate_file_names(copy_and_paste)
