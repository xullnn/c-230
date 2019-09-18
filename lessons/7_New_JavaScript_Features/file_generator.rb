copy_and_paste = <<~NAMES
1   Odd Numbers Not completed
2   Even Numbers    Not completed
.
.
.
10  ASCII String Value  Not completed
NAMES

require 'fileutils'

def generate_file_names(copies, file_type)
  copies.split(/\s+Not completed\n/).each do |file|
    FileUtils.touch(p file.gsub(/\s+/, '_') + file_type)
  end
end

generate_file_names(copy_and_paste, '.js')
