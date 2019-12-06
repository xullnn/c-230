copy_and_paste = <<~NAMES
1	Exploring the Booking App	Not completed
2	Getting Schedules	Not completed
3	Adding Staff	Not completed
4	Adding Schedules	Not completed
5	Booking Time Slots	Not completed
6	Viewing Bookings	Not completed
7	Cancellations	Not completed
NAMES

require 'fileutils'

def generate_file_names(copies, file_type)
  copies.split(/\s+Not completed\n/).each do |file|
    FileUtils.touch(p file.gsub(/\s+/, '_') + file_type)
  end
end

generate_file_names(copy_and_paste, '.html')
