#include <bits/stdc++.h>
using namespace std;
class ZeroTree{
	vector<vector<int>> _tree;
	int _root=0;
	void connect(int x,int y){
		_tree[x].push_back(y);
		_tree[y].push_back(x);
	}
	void cleanTree(int r){
		if(_tree[r].size()==0){
			return;
		}
		for(int x: _tree[r]){
			_tree[x].erase(find(_tree[x].begin(),_tree[x].end(),r));
			cleanTree(x);
		}
	}
	vector<pair<int,int>> arrMerge(const vector<pair<int,int>> parent,const vector<pair<int,int>> child){

		vector<pair<int,int>> result;
		int x=0,y=0;
		while(x<parent.size()&&y<child.size()){
			if(parent[x].first<child[y].first){
				result.push_back(parent[x++]);
			} else {
				result.push_back(child[y++]);
			}
		}
		while(x<parent.size()){
			result.push_back(parent[x++]);
		}
		while(y<child.size()){
			result.push_back(child[y++]);
		}

		return result;
	}
	vector<pair<int,int>> pruferBacktrack(int r,int p){
		// cout<<r<<"(";
		// for(auto x:_tree[r]){
		// 	cout<<x<<";";
		// }
		// cout<<") -> ";
		vector<pair<int,int>>  prufer;
		if(_tree[r].size()!=0){
			for(int x:_tree[r]){
					vector<pair<int,int>> temp = pruferBacktrack(x,r);
					prufer=arrMerge(prufer,temp);
			}
		}
		prufer.push_back(make_pair(r,p));
		return prufer;

	}
	public:
	void printTree(){
		cout<<"-------------------\n";
		for(int i=0;i<_tree.size();i++){
			cout<<i<<" : ";
			for(int y: _tree[i]){
				cout<<y<<" ";
			}
			cout<<" ---\n";
		}
		cout<<"-------------------\n";
	}
	ZeroTree(int n){
		vector<vector<int>> a(n);
		_tree=a;
	}

	void fillEdges(vector<pair<int,int>>& edges){
		for(pair<int,int> x: edges){
			connect(x.first,x.second);
		}
		cleanTree(_root);
	}
	vector<int> pruferize(){
		vector<pair<int,int>> a= pruferBacktrack(_root,_root);
		vector<int> result;
		for(int i=0;i<a.size()-1;i++){
			result.push_back(a[i].second);
		}
		result.pop_back();
		return result;
	}
};
int main(){
	cout<<"Nhap n la so edge cua tree, sau do nhap cac canh a--b duoi dang a b:\n";
	int n;
	cin>>n;
	vector<pair<int,int>> a;
	for(int i=0;i<n;i++){
		int t1,t2;
		cin>>t1>>t2;
		a.push_back(make_pair(t1,t2));
	}
	ZeroTree tree(n+1);
	tree.fillEdges(a);
	// tree.printTree();
	vector<int> result = tree.pruferize();
	for(int i=0;i<result.size();i++){
		cout<<result[i]<<" ";
	}
	cout<<"\n";
}