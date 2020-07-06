copy_and_paste = <<~NAMES
1	Randomizer	Not completed
2	Reverse Engineer	Not completed
3	Bold Element + Custom	Not completed
4	Buggy Code	Not completed
5	Context Menus	Not completed
6	Selection Filters	Not completed
7	Article Highlighter	Not completed
8	Delegate Event Function	Not completed
9	Events Tracker	Not completed
NAMES

require 'fileutils'

def generate_file_names(copies, file_type)
  copies.split(/\s+Not completed\n/).each do |file|
    FileUtils.touch(p file.gsub(/\s+/, '_') + file_type)
  end
end

generate_file_names(copy_and_paste, '.js')
