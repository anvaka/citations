/**
 * count all citations and print them in decreasing order
 */
#include "./json.hpp"
#include <fstream>
#include <iostream>
#include <unordered_map>
#include <string>
#include <vector>
#include <tuple>
#include <algorithm>

using namespace std;
using json = nlohmann::json;


typedef unordered_map <string, int> MapType;
typedef tuple <string, int> Pair;

bool byCount (Pair i, Pair j) { return get<1>(i) > get<1>(j); }

int main(int argc, char const *argv[])
{
  MapType word_frequency;

  cout << "Reading " << argv[1] << endl;
  std::ifstream i(argv[1]);
  int count = 0;
  json j;
  try {
    while (i >> j) {
      for (auto& other: j["o"]) {
        if (word_frequency.find(other) != word_frequency.end()) {
          word_frequency[other] += 1;
        } else {
          word_frequency[other] = 1;
        }
      }
      count += 1;
      if (count % 100000 == 0) {
        cout << "Read " << count << " rows" << endl;
      }
    }
  } catch (std::exception e) {
    std::cout << e.what() << endl;
  }


  std::cout << "Inserting to vector..." << endl;
  vector <Pair> v;
  for( MapType::iterator it = word_frequency.begin(); it != word_frequency.end(); ++it ) {
    v.push_back(make_tuple(it->first, it->second));
  }

  std::cout << "Sorting the vector" << endl;
  std::sort (v.begin(), v.end(), byCount);
  for (std::vector<Pair>::iterator it = v.begin(); it != v.end(); ++it) {
    cout << get<0>(*it) << "," << get<1>(*it) << endl;
  }

  return 0;
}


