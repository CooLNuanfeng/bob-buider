module.exports = function(files, opts, next){
    const filters = Object.create(null);
    const filename = Object.keys(files);

    filters.router =  opts.router;
    filters.store = opts.store;

    for(var key in filters){
        if(!filters[key]){
            filename.forEach(function(name){
                if(name.includes(key)){
                    delete files[name]
                }
            });
        }
    }

    next();
}
