#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#include <Windows.h>
#include <iostream>
#include <filesystem>
#include <string>
#include <vector>
#include <fstream>

namespace fs = std::experimental::filesystem;


constexpr auto page_links = R"(
document.write("<div id='dirwatcher'>");
dirContent.forEach(item => {
  if(item.endsWith(".htm") || item.endsWith(".html")) {
    document.write("<a href='" + item + "' " + (
      window.location.href.endsWith(item)? 
      " style='background: black; color: white; padding: 5px;'": ""
    ) + ">" + item + "</a>&nbsp;&nbsp;");
  }
});

document.write("<br /><hr /><br /></div>");
)";


void UpdateFile(const std::wstring& path)
{
    {
        std::vector<std::wstring> dir_content;
        std::wofstream file_out("dirwatch.js", std::ios::out | std::ios::trunc);

        for (const auto & entry : fs::directory_iterator(path))
            dir_content.push_back(entry.path().filename());

        file_out << "var dirContent = " << '[';
        for (auto i = 0u; i < dir_content.size(); ++i)
        {
            file_out << '"' << dir_content[i] << '"';
            if (i < dir_content.size() - 1)
                file_out << L',';
        }
        file_out << "];";

        file_out << std::endl << page_links << std::endl;
    }
}



int main(int argc, char* argv[])
{
    TCHAR watched_folder[MAX_PATH] = { 0 };
    DWORD rc;

    rc = ::GetCurrentDirectory(MAX_PATH - 1, watched_folder);
    std::wcout << L"Watching: " << watched_folder << std::endl;
    std::cout << "Changes will be dumped to dirwatch.json file.";
    UpdateFile(watched_folder);

    auto change_handle = ::FindFirstChangeNotification(watched_folder, FALSE, FILE_NOTIFY_CHANGE_CREATION | FILE_NOTIFY_CHANGE_FILE_NAME);

    while (true) 
    {
        rc = ::WaitForSingleObject(change_handle, 1000);
        if (rc == WAIT_OBJECT_0)
        {
            std::cout << "Filesystem change detected." << std::endl;
            UpdateFile(watched_folder);
        }

        change_handle = ::FindFirstChangeNotification(watched_folder, FALSE, FILE_NOTIFY_CHANGE_CREATION | FILE_NOTIFY_CHANGE_FILE_NAME);
    }
    
    return 0;
}