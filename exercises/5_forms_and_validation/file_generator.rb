copy_and_paste = <<~NAMES
1	Form Validation, Part 1	Not completed
2	Form Validation, Part 2: Character Blocking Input	Not completed
3	Automatic Tab Forwarding	Not completed
4	Serializing Forms	Not completed
5	Multiple Choice Quiz	Not completed
NAMES

require 'fileutils'

def generate_file_names(copies)
  copies.split(/\s+Not completed\n/).each do |folder|
    FileUtils.mkdir(p folder.gsub(/\s+/, '_'))
  end
end

generate_file_names(copy_and_paste)
