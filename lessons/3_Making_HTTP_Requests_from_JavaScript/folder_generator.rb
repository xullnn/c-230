copy_and_paste = <<~NAMES
1	Asynchronous Execution with setTimeout	Not completed
2	Repeating Execution with setInterval	Not completed
3	User Interfaces and Events	Not completed
4	A Simple Example	Not completed
5	Page Lifecycle Events	Not completed
6	User Events	Not completed
7	Adding Event Listeners	Not completed
8	The Event Object	Not completed
9	Capturing and Bubbling (1)	Not completed
10	Capturing and Bubbling (2)	Not completed
11	Preventing Propagation and Default Behaviors	Not completed
12	Event Delegation	Not completed
13	What is the Event Loop?	Not completed
14	Assignment: Guessing Game	Not completed
15	Assignment: Build an Input Box	Not completed
16	Douglas Crockford: An Inconvenient API	Not completed
17	Summary	Not completed
NAMES

require 'fileutils'

def generate_file_names(copies)
  copies.split(/\s+Not completed\n/).each do |folder|
    FileUtils.mkdir(p folder.gsub(/\s+/, '_'))
  end
end

generate_file_names(copy_and_paste)
