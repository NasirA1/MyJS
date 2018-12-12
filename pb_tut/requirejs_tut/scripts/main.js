requirejs([
    "example"
 ], function(example) {
     console.log("calling example.add()...");
     console.log("result: " + example.add(5, 3));
 });