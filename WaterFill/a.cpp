#include <bits/stdc++.h>
using namespace std;
template <typename T>
class TreeNode{
    public:
    T val;
    virtual void printVal() = 0;
    vector<TreeNode*> children;
    virtual void printGraphViz()=0;
};
class Bucket:public TreeNode<vector<int>>{
    private:
    vector<int> Sbuck;
    /**
     * @brief Compare a's val to b's val. Does not care about Sbuck.
     * @return True if equal
     */
    bool isEqualState(Bucket const& a,Bucket const& b){
        if(a.val.size()!=b.val.size()) {
            return false;
        }
        for(int i=0;i<a.val.size();i++){
            if(a.val[i]!=b.val[i])
                return false;
        }
        return true;
    }
    Bucket* pour(int i,int j){
        // if(val[j]==Sbuck[j]) return;
        vector<int> Tbuck=val;
        Tbuck[j]=min(val[j]+val[i],Sbuck[j]);
        Tbuck[i]=val[i]+val[j]-Tbuck[j];
        Bucket* temp= new Bucket(Tbuck,Sbuck);
        return temp;
    }
    bool addChild(Bucket* child,vector<Bucket*>& seenStates){
        for(Bucket* x: seenStates){
            if(isEqualState(*child,*x)){
                delete(child);
                return false;
            }
        }
        children.push_back(child);
        seenStates.push_back(child);
        return true;
    }
    public:
    vector<Bucket*> children=vector<Bucket*>();
    vector<int> val;
    void printVal(){
        cout<<"\"(";
        for(int i=0;i<val.size()-1;i++){
            cout<<val[i]<<',';
        }
        cout<<val.back()<<")\"";
    }
    string stringifyVal(){
        ostringstream oss;
        oss<<"\"(";
        for(int i=0;i<val.size()-1;i++){
            oss<<val[i]<<',';
        }
        oss<<val.back()<<")\"";
        return oss.str();
    }
    Bucket(vector<int> const& val,vector<int> const& Sbuck){
        if(val.size()!=Sbuck.size()) {
            throw invalid_argument("Bucket: Bucket size does not match its configuration.");
        }
        this->val=val;
        this->Sbuck=Sbuck;
    }
    static void dfg(Bucket& current,vector<Bucket*>& seenStates){
        int n=current.val.size();
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                if(current.val[j]!=current.Sbuck[j]&&current.val[i]!=0){
                    if(current.addChild(current.pour(i,j),seenStates)){
                        dfg(*current.children.back(),seenStates);
                    }
                }
                if(current.val[i]!=current.Sbuck[i]&&current.val[j]!=0){
                    if(current.addChild(current.pour(j,i),seenStates)){
                        // cout<<i<<" - "<<j<<"\n";
                        dfg(*current.children.back(),seenStates);
                    }
                }
            }
        }
    }
    void printGraphViz(){
        cout<<"graph{\n";
        queue<Bucket*> q;
        q.push(this);
        while(!q.empty()){
            for(Bucket* x: q.front()->children){
                q.front()->printVal();
                cout<<" -- ";
                x->printVal();
                cout<<";\n";
                q.push(x);
            }
            q.pop();
        }
        cout<<"}\n";
    }
    void printSolution(int bucketVal, int bucketID){
        ostringstream oss;
        oss<<"graph{\n";
        stack<pair<Bucket*,Bucket*>> s;
        Bucket* cur=this;
        oss<<cur->stringifyVal()<<"[style=filled,color=blue];\n";
        while(true){
            if(cur->val[bucketID]==bucketVal){
                oss<<cur->stringifyVal()<<"[style=filled,color=red];\n}\n";
                cout<<oss.str();
                return;
            }
            for(Bucket* x:cur->children){
                s.push(make_pair(cur,x));
            }
            if(s.empty()) break;
            oss<<s.top().first->stringifyVal()<<" -- "<<s.top().second->stringifyVal()<<";\n";
            cur=s.top().second;
            s.pop();
        }
        cout<<"No solutions found.\n";
    }
};
int main(){
    Bucket a = Bucket(vector<int>{0,7,4},vector<int>{10,7,4});
    vector<Bucket*>s={&a};
    Bucket::dfg(a,s);
    cout<<"Graphviz Representation Of DFS on the whole tree:\n";
    a.printGraphViz();
    cout<<"Solution to dung 2l trong binh 4l:\n";
    a.printSolution(2,2);
    cout<<"Solution to dung 2l trong binh 7l:\n";
    a.printSolution(2,1);
    system("pause");
    return 0;
}
