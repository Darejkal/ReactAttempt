#include <bits/stdc++.h>
using namespace std;
// vector<string> colorCodes = {"liceblue","antiquewhite","antiquewhite1","antiquewhite2","antiquewhite3","antiquewhite4","aqua","aquamarine","aquamarine1","aquamarine2","aquamarine3","aquamarine4","azure","azure1","azure2","azure3","azure4","beige","bisque","bisque1","bisque2","bisque3","bisque4","black","blanchedalmond","blue","blue1","blue2","blue3","blue4","blueviolet","brown","brown1","brown2","brown3","brown4","burlywood","burlywood1","burlywood2","burlywood3","burlywood4","cadetblue","cadetblue1","cadetblue2","cadetblue3","cadetblue4","chartreuse","chartreuse1","chartreuse2","chartreuse3","chartreuse4","chocolate","chocolate1","chocolate2","chocolate3","chocolate4","coral","coral1","coral2","coral3","coral4","cornflowerblue","cornsilk","cornsilk1","cornsilk2","cornsilk3","cornsilk4","crimson","cyan","cyan1","cyan2","cyan3","cyan4","darkblue","darkcyan","darkgoldenrod","darkgoldenrod1","darkgoldenrod2","darkgoldenrod3","darkgoldenrod4","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkolivegreen1","darkolivegreen2","darkolivegreen3","darkolivegreen4","darkorange","darkorange1","darkorange2","darkorange3","darkorange4","darkorchid","darkorchid1","darkorchid2","darkorchid3","darkorchid4","darkred","darksalmon","darkseagreen","darkseagreen1","darkseagreen2","darkseagreen3","darkseagreen4","darkslateblue","darkslategray","darkslategray1","darkslategray2","darkslategray3","darkslategray4","darkslategrey","darkturquoise","darkviolet","deeppink","deeppink1","deeppink2","deeppink3","deeppink4","deepskyblue","deepskyblue1","deepskyblue2","deepskyblue3","deepskyblue4","dimgray","dimgrey","dodgerblue","dodgerblue1","dodgerblue2","dodgerblue3","dodgerblue4","firebrick","firebrick1","firebrick2","firebrick3","firebrick4","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","gold1","gold2","gold3","gold4","goldenrod","goldenrod1","goldenrod2","goldenrod3","goldenrod4","gray","gray0","gray1","gray10","gray100","gray11","gray12","gray13","gray14","gray15","gray16","gray17","gray18","gray19","gray2","gray20","gray21","gray22","gray23","gray24","gray25","gray26","gray27","gray28","gray29","gray3","gray30","gray31","gray32","gray33","gray34","gray35","gray36","gray37","gray38","gray39","gray4","gray40","gray41","gray42","gray43","gray44","gray45","gray46","gray47","gray48","gray49","gray5","gray50","gray51","gray52","gray53","gray54","gray55","gray56","gray57","gray58","gray59","gray6","gray60","gray61","gray62","gray63","gray64","gray65","gray66","gray67","gray68","gray69","gray7","gray70","gray71","gray72","gray73","gray74","gray75","gray76","gray77","gray78","gray79","gray8","gray80","gray81","gray82","gray83","gray84","gray85","gray86","gray87","gray88","gray89","gray9","gray90","gray91","gray92","gray93","gray94","gray95","gray96","gray97","gray98","gray99","green","green1","green2","green3","green4","greenyellow","grey","grey0","grey1","grey10","grey100","grey11","grey12","grey13","grey14","grey15","grey16","grey17","grey18","grey19","grey2","grey20","grey21","grey22","grey23","grey24","grey25","grey26","grey27","grey28","grey29","grey3","grey30","grey31","grey32","grey33","grey34","grey35","grey36","grey37","grey38","grey39","grey4","grey40","grey41","grey42","grey43","grey44","grey45","grey46","grey47","grey48","grey49","grey5","grey50","grey51","grey52","grey53","grey54","grey55","grey56","grey57","grey58","grey59","grey6","grey60","grey61","grey62","grey63","grey64","grey65","grey66","grey67","grey68","grey69","grey7","grey70","grey71","grey72","grey73","grey74","grey75","grey76","grey77","grey78","grey79","grey8","grey80","grey81","grey82","grey83","grey84","grey85","grey86","grey87","grey88","grey89","grey9","grey90","grey91","grey92","grey93","grey94","grey95","grey96","grey97","grey98","grey99","honeydew","honeydew1","honeydew2","honeydew3","honeydew4","hotpink","hotpink1","hotpink2","hotpink3","hotpink4","indianred","indianred1","indianred2","indianred3","indianred4","indigo","invis","ivory","ivory1","ivory2","ivory3","ivory4","khaki","khaki1","khaki2","khaki3","khaki4","lavender","lavenderblush","lavenderblush1","lavenderblush2","lavenderblush3","lavenderblush4","lawngreen","lemonchiffon","lemonchiffon1","lemonchiffon2","lemonchiffon3","lemonchiffon4","lightblue","lightblue1","lightblue2","lightblue3","lightblue4","lightcoral","lightcyan","lightcyan1","lightcyan2","lightcyan3","lightcyan4","lightgoldenrod","lightgoldenrod1","lightgoldenrod2","lightgoldenrod3","lightgoldenrod4","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightpink1","lightpink2","lightpink3","lightpink4","lightsalmon","lightsalmon1","lightsalmon2","lightsalmon3","lightsalmon4","lightseagreen","lightskyblue","lightskyblue1","lightskyblue2","lightskyblue3","lightskyblue4","lightslateblue","lightslategray","lightslategrey","lightsteelblue","lightsteelblue1","lightsteelblue2","lightsteelblue3","lightsteelblue4","lightyellow","lightyellow1","lightyellow2","lightyellow3","lightyellow4","lime","limegreen","linen","magenta","magenta1","magenta2","magenta3","magenta4","maroon","maroon1","maroon2","maroon3","maroon4","mediumaquamarine","mediumblue","mediumorchid","mediumorchid1","mediumorchid2","mediumorchid3","mediumorchid4","mediumpurple","mediumpurple1","mediumpurple2","mediumpurple3","mediumpurple4","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","mistyrose1","mistyrose2","mistyrose3","mistyrose4","moccasin","navajowhite","navajowhite1","navajowhite2","navajowhite3","navajowhite4","navy","navyblue","none","oldlace","olive","olivedrab","olivedrab1","olivedrab2","olivedrab3","olivedrab4","orange","orange1","orange2","orange3","orange4","orangered","orangered1","orangered2","orangered3","orangered4","orchid","orchid1","orchid2","orchid3","orchid4","palegoldenrod","palegreen","palegreen1","palegreen2","palegreen3","palegreen4","paleturquoise","paleturquoise1","paleturquoise2","paleturquoise3","paleturquoise4","palevioletred","palevioletred1","palevioletred2","palevioletred3","palevioletred4","papayawhip","peachpuff","peachpuff1","peachpuff2","peachpuff3","peachpuff4","peru","pink","pink1","pink2","pink3","pink4","plum","plum1","plum2","plum3","plum4","powderblue","purple","purple1","purple2","purple3","purple4","rebeccapurple","red","red1","red2","red3","red4","rosybrown","rosybrown1","rosybrown2","rosybrown3","rosybrown4","royalblue","royalblue1","royalblue2","royalblue3","royalblue4","saddlebrown","salmon","salmon1","salmon2","salmon3","salmon4","sandybrown","seagreen","seagreen1","seagreen2","seagreen3","seagreen4","seashell","seashell1","seashell2","seashell3","seashell4","sienna","sienna1","sienna2","sienna3","sienna4","silver","skyblue","skyblue1","skyblue2","skyblue3","skyblue4","slateblue","slateblue1","slateblue2","slateblue3","slateblue4","slategray","slategray1","slategray2","slategray3","slategray4","slategrey","snow","snow1","snow2","snow3","snow4","springgreen","springgreen1","springgreen2","springgreen3","springgreen4","steelblue","steelblue1","steelblue2","steelblue3","steelblue4","tan","tan1","tan2","tan3","tan4","teal","thistle","thistle1","thistle2","thistle3","thistle4","tomato","tomato1","tomato2","tomato3","tomato4","transparent","turquoise","turquoise1","turquoise2","turquoise3","turquoise4","violet","violetred","violetred1","violetred2","violetred3","violetred4","webgray","webgreen","webgrey","webmaroon","webpurple","wheat","wheat1","wheat2","wheat3","wheat4","white","whitesmoke","x11gray","x11green","x11grey","x11maroon","x11purple","yellow","yellow1","yellow2","yellow3","yellow4","yellowgreen"};
vector<string> colorCodes = {"aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"};
//generate color that take advantage of graphviz's gradient.
string funcGetColorFromNum(int x){
    string r;
    // (fixate) is used to avoid using the same color for the gradient as before
    int fixate=0;
    int sz=colorCodes.size();
    do{
        r.append(colorCodes[x%sz+fixate]);
        r.append(":");
        x/=sz;
        fixate=(fixate+1)%sz;
    }while(x>0);
    return r;
}
bool funcGetNodesByDegree(pair<int,int> a,pair<int,int> b){
    return a.second>b.second;
}
class ColoredGraph{
    vector<int> _a;
    vector<vector<int>> _b;
    //only used for result printing.
    vector<pair<int,int>> _edges;
    //--------------------//
    /*find the minium value of color that is different from the color values of those with index in id
    i is the index to color
    */
    int maxofminVect(int i,const vector<int>& id,const vector<int>& val){
        int r=0;
        Loop:
        for(int x:id){
            if(x!=i&&r==val[x]){
                r++;
                goto Loop;
            }
        }
        return r;
    }
    /*find the minium value of color that is different from the color values of those with index in id
    no use for the index to color 
    the function using this must assume the current index is not yet colored, or its color will not be 0
    */
    int maxofminVect(const vector<int>& id,const vector<int>& val){
        int r=1;
        Loop:
        for(int x:id){
            if(r==val[x]){
                r++;
                goto Loop;
            }
        }
        return r;
    }
    void _greedilyColorize(int i){
        _a[i]=maxofminVect(_b[i],_a);
    }
    void _colorFromVertices(int i){
        if(_a[i]!=0) return;
        _greedilyColorize(i);
        for(int x: _b[i]){
            _colorFromVertices(x);
        }
    }
    //--------------------//
    public:
    //n is the number of vertices.
    ColoredGraph(int n){
        vector<int>a(n+1,0);
        _a=a;
        vector<vector<int>> b(n+1);
        _b=b;
    }
    void connectVertices(int a,int b){
        _b[a].push_back(b);
        _b[b].push_back(a);
        _edges.push_back(make_pair(a,b));
    }
    void colorClear(){
        for(int x: _a){
            x=0;
        }
    }
    /*order contains the order in which the nodes need to be greedily colored.
    */
    void colorAll(const vector<int>& order){
        colorClear();
        for(int i: order){
            _greedilyColorize(i);
        }
    }
    vector<int> getColor(){
        return _a;
    }
    vector<pair<int,int>> getEdges(){
        return _edges;
    }
    /* return the nodes in the descending order relative to their degree.
    */
    vector<int> getNodesByDegree(){
        vector<pair<int,int>> r;
        for(int i=1;i<_a.size();i++){
            r.push_back(make_pair(i,_a[i]));
        }
        sort(r.begin(),r.end(),funcGetNodesByDegree);
        vector<int> result;
        for(auto x:r){
            result.push_back(x.first);
        }
        return result;
    }
    int getHighestDegreeVertices(){
        int m=0;
        for(int i=1;i<_b.size();i++){
            if(_b[i].size()>_b[m].size())
                m=i;
        }
        return m;
    }
    void colorFromVertices(int i){
        colorClear();
        _colorFromVertices(i);
    }
};
int main(){
    int m,n;
    cin>>n>>m;
    ColoredGraph g(n);
    for(int i=0;i<m;i++){
        int a,b;
        cin>>a>>b;
        g.connectVertices(a,b);
    }

    //colorAll is slower
    // g.colorAll(g.getNodesByDegree());

    g.colorFromVertices(g.getHighestDegreeVertices());



    vector<int> color=g.getColor();
    int numberOfColorsUsed=0;
    for(int i=0;i<color.size();i++){
        numberOfColorsUsed=max(numberOfColorsUsed,color[i]);
    }
    cout<<"NUMBER OF COLOR USED: "<<numberOfColorsUsed<<"\n\n";
    
    //this is used to print to cmd
    cout<<"graph dothi\n{\n";
    for(int i=0;i<color.size();i++){
        //The following condition is to prevent the cases when there is node 0 instead of node n in the graph
        //Color 0 means that the node is not yet colored, a situation for this is when the node is isolated (a.k.a not connecting to any other node).
        if(color[i]!=0)
            cout<<"\t"<<i<<" [fillcolor=\""<<funcGetColorFromNum(color[i])<<"\", style=filled];\n";
    }
    for(auto x:g.getEdges()){
        cout<<"\t"<< x.first<<" -- "<<x.second<<";\n";
    }
    cout<<"}";

    //this is used to create a new file
    // freopen("a.dot","w",stdout);
    // cout<<"graph dothi\n{\n";
    // for(int i=0;i<color.size();i++){
    //     //The following condition is to prevent the cases when there is node 0 instead of node n in the graph
    //     //Color 0 means that the node is not yet colored, a situation for this is when the node is isolated (a.k.a not connecting to any other node).
    //     if(color[i]!=0)
    //         cout<<"\t"<<i<<" [fillcolor=\""<<funcGetColorFromNum(color[i])<<"\", style=filled];\n";
    // }
    // for(auto x:g.getEdges()){
    //     cout<<"\t"<< x.first<<" -- "<<x.second<<";\n";
    // }
    // cout<<"}";
    
}