"use client";
import ProjectCard, { Project } from "@/components/projectCard";
import { Dropzone } from "@yamada-ui/dropzone";
import { Box, Button, FileInput, FormControl, Heading, HStack, Input, Textarea, VStack } from "@yamada-ui/react";
import { locations } from "@/assets/locations";

import { useCallback, useRef, useState } from "react";
import { number } from "framer-motion";

export default function Home() {
  const [currentProject, setCurrentProject] = useState<Project>({
    organizationName: "団体名がここに入力されます",
    projectTitle: "企画名がここに入力されます",
    thumbnail: "",
    tags: ["文化部","所要時間長", "販売あり", "大人も楽しめる"],
    description: {
      heading: "紹介文の見出しがここに入力されます",
      text: "ここに紹介文が入力されます。ここの内容は任意で変更できます。",
    },
    location: [
      {
        number: "2-4D",
        name: "高2-3教室",
      },
    ],
  });
  const [workingProjects, setWorkingProjects] = useState<Project[]>([]);

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;
  let i = 0;

  while (i < csv.length) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // エスケープされた二重引用符 ("")
          currentCell += '"';
          i++; // 追加で1文字進める
        } else {
          // 引用符の終了
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentCell);
        currentCell = '';
      } else if (char === '\r' && nextChar === '\n') {
        currentRow.push(currentCell);
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        i++; // CRLF (\r\n) の場合は \n もスキップ
      } else if (char === '\n' || char === '\r') {
        currentRow.push(currentCell);
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    i++;
  }

  // 最後のセルと行を追加
  currentRow.push(currentCell);
  rows.push(currentRow);

  return rows;
}


  // CSVファイル読み込みハンドラ
  // 団体名,企画名,実施場所ID(カンマ区切り),タグ(カンマ区切り),見出し,紹介文
  // カンマ区切りの項目はダブルクオーテーションでエスケープ済み
  const handlerChangeCSVFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csvText = reader.result as string;
        const csvArray = parseCSV(csvText);
        console.log(csvArray);
        const projects: Project[] = csvArray.map((row) => {
          const [organizationName, projectTitle, locationIds, tags, heading, text] = row;
          const locationsArray = locationIds
            .split(",")
            .map((id) => {
              const location = locations.find((loc) => loc.id === id);
              return location ? { number: location.number, name: location.name } : null;
            })
            .filter((loc): loc is { number: string; name: string } => loc !== null);
          return {
            organizationName,
            projectTitle,
            thumbnail: "",
            tags: tags.split(",").map((tag) => tag.trim()),
            description: {
              heading,
              text,
            },
            location: locationsArray,
          };
        });
        setWorkingProjects(projects);
        setCurrentProject(projects[0]);
      };
    },
    []
  );
    function handleDownload() {
    console.log(projectCardElement.current);
    if (!projectCardElement.current) return;
    const svg = projectCardElement.current.innerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tickets.svg";
    a.click();
    URL.revokeObjectURL(url);
    console.log("download");
  }
  // ファイル変更ハンドラ
  const handlerChangeImageFileInput = useCallback(
    (files: File[] | undefined) => {
      const file = files?.[0];
      if (!file) {
        return;
      }
      // 選択されたファイルが画像ファイル以外であればreturn
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        // バリデーションメッセージ表示
        console.log("jpeg/pngファイルを選択してください");
        return;
      }
      const reader = new FileReader();
      // base64に変換
      reader.readAsDataURL(file);
      reader.onload = () => {
        // base64に変換した結果をstateにセットする
        setCurrentProject((prev) => {
          return {
            ...prev,
            thumbnail: reader.result as string,
          };
        });
        console.log(reader.result);
      };
    },
    []
  );
  function handleNextProject() {
    setCurrentProject((prev) => {
      const currentIndex = workingProjects.indexOf(prev);
      const nextIndex = (currentIndex + 1) % workingProjects.length;
      return workingProjects[nextIndex];
    });
  }
  function handlePreviousProject() {
    setCurrentProject((prev) => {
      const currentIndex = workingProjects.indexOf(prev);
      const previousIndex =
        (currentIndex - 1 + workingProjects.length) % workingProjects.length;
      return workingProjects[previousIndex];
    });
  }
  const projectCardElement = useRef<HTMLDivElement>(null);
  return (
    <Box p={4}>
      <Box as={HStack}>
        <Box>
        <Heading>ProjectCard Generator</Heading>
        <FormControl label="CSVファイルを選択">
          <Dropzone  accept={[".csv"]} onChange={handlerChangeCSVFileInput}  >ここにCSVファイルをドラッグ＆ドロップ</Dropzone>
          </FormControl>
        <VStack>
          <FormControl label="画像を選択">
          <FileInput
            accept="image/*"
                onChange={handlerChangeImageFileInput}
                placeholder="画像を選択"
            />
          </FormControl>
          <FormControl label="企画名">
            <Input
              type="text"
              value={currentProject.projectTitle}
              onChange={(e) =>
                setCurrentProject((prev) => ({
                  ...prev,
                  projectTitle: e.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl label="団体名">
            <Input
              type="text"
              value={currentProject.organizationName}
              onChange={(e) =>
                setCurrentProject((prev) => ({
                  ...prev,
                  organizationName: e.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl label="紹介文の見出し">
            <Input
              type="text"
              value={currentProject.description.heading}
              onChange={(e) =>
                setCurrentProject((prev) => ({
                  ...prev,
                  description: {
                    ...prev.description,        
                    heading: e.target.value,
                  },
                }))
              }
            />
          </FormControl>
          <FormControl label="紹介文">
            <Textarea
              value={currentProject.description.text}
              onChange={(e) =>
                setCurrentProject((prev) => ({
                  ...prev,  
                  description: {
                    ...prev.description,
                    text: e.target.value,
                  },
                }))
              }
            />
          </FormControl>
          <FormControl label="タグ">
            <Input
              type="text"
              value={currentProject.tags.join(",")}
              onChange={(e) =>
                setCurrentProject((prev) => ({
                  ...prev,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                }))
              }
            />
          </FormControl>
          <HStack pos="sticky" bottom={0} bg="white" p={2}>
              <Button onClick={handlePreviousProject}
                disabled={workingProjects.length <= 1}
              >前の企画へ</Button>
            <Button colorScheme="primary" onClick={handleDownload}>保存</Button>
            <Button disabled={workingProjects.length <= 1} onClick={handleNextProject}>次の企画へ</Button>
         </HStack>
        </VStack>
        </Box>
        <Box ref={projectCardElement} flexGrow={1}>
          <ProjectCard project={currentProject} />
        </Box>
      </Box>
    </Box>
  );
}
