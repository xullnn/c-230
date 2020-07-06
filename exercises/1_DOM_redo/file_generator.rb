copy_and_paste = <<~NAMES
1	Counting Nodes	Not completed
2	Child Nodes	Not completed
3	Tracing the DOM Tree	Not completed
4	Tree Slicing	Not completed
5	Coloring	Not completed
6	Node Swap	Not completed
7	Nodes to Array	Not completed
8	Array to Nodes	Not completed
9	Work Back	Not completed
10	HTML Imaging	Not completed
NAMES

require 'fileutils'

def generate_file_names(copies, file_type)
  copies.split(/\s+Not completed\n/).each do |file|
    FileUtils.touch(p file.gsub(/\s+/, '_') + file_type)
  end
end

generate_file_names(copy_and_paste, '.js')
