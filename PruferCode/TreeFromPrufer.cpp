#include <bits/stdc++.h>
using namespace std;
int main(){
	int n;
	cin>>n;
	vector<int> a;
	vector<int> b;
	int temp;
	for(int i=0;i<n-1;i++){
		cin>> temp;
		a.push_back(temp);
		b.push_back(0);
	}
	a.push_back(0);
	b.push_back(0);
	b.push_back(0);
	for(int i=0;i<n;i++){
		b[a[i]]++;
	}
	vector<int> result;
	for(int x: a){
		for(int i=1;i<n+1;i++){
			if(b[i]==0){
				result.push_back(i);
				b[i]--;
				break;
			}
		}
		b[x]--;
	}
    cout<<"graph{\n";
	for(int i=0;i<n;i++){
		cout<<result[i]<<" -- "<<a[i]<<";\n";
	}
	cout<<"\n}";
}