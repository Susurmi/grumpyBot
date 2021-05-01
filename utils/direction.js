function  degToDirection(degree){
    if (degree>337.5) return 'Nördlich';
    if (degree>292.5) return 'Nord Westlich';
    if(degree>247.5) return 'Westlich';
    if(degree>202.5) return 'Süd Westlich';
    if(degree>157.5) return 'Südlich';
    if(degree>122.5) return 'Süd Östlich';
    if(degree>67.5) return 'Östlich';
    if(degree>22.5){return 'Nord Östlich';}
    return 'Nördlich';
};
 
module.exports = { degToDirection };