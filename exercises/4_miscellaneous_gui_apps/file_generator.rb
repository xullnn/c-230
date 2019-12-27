copy_and_paste = <<~NAMES
1	Exotic Animals	Not completed
2	Programming Languages Info	Not completed
3	A Custom Delete Confirmation Prompt	Not completed
4	Context Menu for Todo List	Not completed
5	A Car Shop With Filtering	Not completed
6	Adding Smart Select to Car Shop	Not completed
7	A JavaScript Stopwatch	Not completed
8	A JavaScript Calculator	Not completed
9	A JavaScript WYSIWYG Editor	Not completed
NAMES

require 'fileutils'

def generate_file_names(copies)
  copies.split(/\s+Not completed\n/).each do |folder|
    FileUtils.mkdir(p folder.gsub(/\s+/, '_'))
  end
end

generate_file_names(copy_and_paste)
