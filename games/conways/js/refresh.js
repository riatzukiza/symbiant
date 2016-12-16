var socket = io("/conways");
socket.on("change", () => {
	
  console.log("change ");
  return location.reload();

});