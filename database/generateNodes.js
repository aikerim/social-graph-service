// optimized csv file generator with 10M datapoint: < 3 mins 
var generateNodes = function (nodeCount) {
    var line;
    var stream = fs.createWriteStream('tweetUsers.csv', { flags: 'w' });
    var header = "\"id\",\"name\"\n";
    stream.write(header);
    i = nodeCount;
    write();
    function write() {
        var ok = true;
        do {
            i -= 1;
            if (i % 1000 === 0) {
                console.log('writing: ', i);
            }
            line = "\"" + i + "\",\"Aygerim" + i + '\"\n';

            if (i === 0) {
                stream.write(line);
            } else {
                ok = stream.write(line);
            }
        } while (i > 0 && ok);
        if (i > 0) {
            stream.once('drain', write);
        }
    }
}
// generateNodes(50000);