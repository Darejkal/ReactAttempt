#include <bits/stdc++.h>
using namespace std;
class Edge{
    public:
    int x,w,y;
    Edge(int x, int y, int w){
        this->x=x;
        this->w=w;
        this->y=y;
    }
};
// class AVLDT{
//     friend bool operator>(const AVLDT& a, const AVLDT& b){
//     }
//     friend bool operator==(const AVLDT& a, const AVLDT& b){
//     }
// };
// class AVL{
//     public:
//     AVLDT a;
//     AVL* left;
//     AVL* right;
//     AVL(AVLDT a, AVL* left,AVL* right){
//         this->a=a;
//         this->left=left;
//         this->right=right;
//     }
//     static AVL* insert(AVL* x,AVLDT v){
//     }
//     static AVL* search(AVL* x){
//     }
//     static AVL* findMin(AVL* x){
//     }
//     static AVL* del(AVL*x, AVLDT v){
//     }
// };


// class MinHeap{
//     vector<int> a;
//     public:
//     MinHeap(const vector<int>& b){
//         a=b;
//         for(int i=(a.size()-1)/2;i>-1;i--){
//             heapify(i);
//         }
//     }
//     MinHeap(){}
//     int size(){
//         return a.size();
//     }
//     int operator[](int i){
//         return a[i];
//     }
//     void update(int node, int pre, int dist){
//         for(int i=0;i<a.size();i++){
//             if(a[i].node==node){
//                 a[i].pre=pre;
//                 a[i].dist=dist;
//                 heapify(i);
//                 while(i>0&&a[(i-1)/2].dist>a[i].dist){
//                     swap(a[(i-1)/2],a[i]);
//                     i=(i-1)/2;
//                 }
//                 return;
//             }
//         }
//     }
//     void insert(int x){
//         int i=a.size();
//         a.push_back(x);
//         while(i>0&&a[(i-1)/2].dist>a[i].dist){
//             swap(a[(i-1)/2],a[i]);
//             i=(i-1)/2;
//         }
//     }
//     void heapify(int i){
//         while(i<a.size()){
//             int m=i;
//             if(2*i+1<a.size()&&a[2*i+1].dist<a[m].dist){
//                 m=2*i+1;
//             }
//             if(2*i+2<a.size()&&a[2*i+2].dist<a[m].dist){
//                 m=2*i+2;
//             }
//             if(m!=i){
//                 swap(a[m],a[i]);
//                 i=m;
//             } else break;
//         }
//     }
//     void erase(int i){
//         swap(a[i],a.back());
//         a.pop_back();
//         heapify(i);
//     }
//     int search(int node){
//         queue<int> q;
//         q.push(0);
//         while(!q.empty()){
//             int i=q.front();
//             q.pop();
//             if(a[i].node<node){
//                 if(i*2+1<a.size())q.push(i*2+1);
//                 if(i*2+2<a.size())q.push(i*2+2);
//             }
//             else if(a[i].node==node){
//                 return i;
//             }
//         }
//         return -1;
//     }
// };

class RobotGraph{
    vector<vector<bool>> visited;
    vector<vector<bool>> pDed;
    vector<vector<int>> dist;

    void pDijkstra(const int x){
        vector<bool> isDoneDij(n,0);
        for(int i=0;i<n;i++){
            if(pDed[i][x]){
                isDoneDij[i]=1;
            }
        }
        dist[x][x]=0;
        int uid=x;
        while(true){
            isDoneDij[uid]=1;
            // cout<<"NEXT MIN from "<<x<< ": node: "<<uid<<",dist: "<<dist[uid][x] <<"\n";
            vector<Edge> connected=pAdjWithXFirst(uid);
            for(Edge e:connected){
                // cout<<"Node "<<e.y<<"\n";
                if(e.w+dist[x][uid]<dist[x][e.y]){
                    dist[x][e.y]=e.w+dist[x][uid];
                    // cout<<"\t->Updated to "<<dist[x][e.y]<<" \n";
                    dist[e.y][x]=e.w+dist[x][uid];
                }
            }   
            uid=find(isDoneDij.begin(),isDoneDij.end(),0)-isDoneDij.begin();
            if(uid==n) break;
            for(int i=uid;i<isDoneDij.size();i++){                
                // cout<<"\t--heap: node: "<<isDoneDij[i].node<<",parent: "<<isDoneDij[i].pre<<",dist: "<<isDoneDij[i].dist <<"\n";
                if(!isDoneDij[i]&&dist[x][i]<dist[x][uid]){
                    uid=i;
                }
            }
        
        }
        // cout<<"------------------DONE:>\n";
    }
    vector<Edge> pAdjWithXFirst(int x){
        vector<Edge> result;
        for(Edge a: G){
            if(a.x==x){
                result.push_back(a);
            } else if(a.y==x){
                result.push_back(Edge(a.y,a.x,a.w));
            }
        }
        return result;
    }
    int pDist(int x, int y){
        if(!pDed[x][y]){
            pDijkstra(x);
            pDed[x][y]=1;
            pDed[y][x]=1;
        }
        return dist[x][y];
        
    }
    bool backtrackSolve(vector<pair<int,int>>& path,int x2,int y2,int r){
        int x1=path.back().first,y1=path.back().second;
        if(x1==x2&&y1==y2) return true;
        if(path.size()>0){
            cout<<"PATH traveled: "<<path.back().first<<" "<<path.back().second<<"\n";
        }
        visited[x1][y1]=true;
        if(pDist(x1,y1)<=r){
            cout<<"DIST small:("<<x1<<","<<y1<<") -> "<<pDist(x1,y1)<<"\n"<<"\n";
            return false;
        }
        vector<Edge> adj=pAdjWithXFirst(x1);
        for(Edge x:adj){
            if(visited[x.y][y1]){
               continue;
            }
            path.push_back(make_pair(x.y,y1));
            if(backtrackSolve(path,x2,y2,r)){
                return true;
            }
            path.pop_back();
        }
        adj=pAdjWithXFirst(y1);
        for(Edge y:adj){
            if(visited[x1][y.y]){
               continue;
            }
            path.push_back(make_pair(x1,y.y));
            if(backtrackSolve(path,x2,y2,r)){
                return true;
            }
            path.pop_back();
        }
        return false;
    }
    vector<Edge> G; 
    public:
    int n;
    // vector<vector<int>> dist;
    RobotGraph(int n){
        this->n=n;
        visited=vector<vector<bool>>(n,vector<bool>(n,false));
        pDed=vector<vector<bool>>(n,vector<bool>(n,false));
        dist=vector<vector<int>>(n,vector<int>(n,INT16_MAX));
    }
    /// @brief push_back to G an Edge that satisfy e.x<e.y;
    /// @param e 
    void ePush(Edge e){
        if(e.x>e.y) swap(e.x,e.y);
        G.push_back(e);
    }
    vector<pair<int,int>> solve(int x1,int y1,int x2,int y2,int r){
        vector<pair<int,int>> path={make_pair(x1,y1)};
        if(backtrackSolve(path,x2,y2,r))
            return path;
        else return vector<pair<int,int>>();
    }
};
int main(){
    int n,m,a,b,c,d,r;
    cin>>n>>m;
    int x,y,w;
    RobotGraph rg=RobotGraph(n);
    for(int i=0;i<m;i++){
        cin>>x>>y>>w;
        rg.ePush(Edge(x,y,w));
    }
    cin>>a>>b>>c>>d>>r;
    vector<pair<int,int>> arr= rg.solve(a,c,b,d,r);
    if(arr.size()==0){
        cout<<"Khong the!";
    } else {
        for(int i=0;i<arr.size();i++){
            cout<<arr[i].first<<" "<<arr[i].second<<"\n";
        }
    }
}