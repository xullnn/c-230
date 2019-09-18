copy_and_paste = <<~NAMES
3	Making HTTP Requests from JavaScript	Not started
4	jQuery	Not started
5	Putting it All Together	Not started
6	Advanced jQuery and Dynamic Content Creation	Not started
7	New JavaScript Features	Not started
NAMES

require 'fileutils'

def generate_file_names(copies)
  copies.split(/\s+Not started\n/).each do |folder|
    FileUtils.mkdir(p folder.gsub(/\s+/, '_'))
  end
end

generate_file_names(copy_and_paste)
