import React from 'react';
import { Server, Box, Database, Network, Layers, FileText, Package, HardDrive } from 'lucide-react';

// tailwindcss styles are used for layout and styling
const DockerArchitectureDiagram:React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Docker 아키텍처 & 주요 용어
        </h1>
        
        {/* 클라이언트-서버 구조 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
            <Server size={24} />
            클라이언트-서버 구조
          </h2>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6 inline-block">
                <FileText
                  size={48}
                  className="text-blue-600 mx-auto mb-2" />
                <p className="font-bold">
                  Docker Client
                </p>
                <p className="text-sm text-gray-600">
                  docker CLI
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-2xl">
                →
              </div>
              <div className="bg-yellow-100 px-4 py-2 rounded mt-2">
                <p className="text-sm font-bold">
                  Unix Socket
                </p>
                <p className="text-xs text-gray-600">
                  /var/run/docker.sock
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6 inline-block">
                <Server 
                  size={48}
                  className="text-green-600 mx-auto mb-2" />
                <p className="font-bold">
                  Docker Daemon
                </p>
                <p className="text-sm text-gray-600">
                  dockerd
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 이미지와 컨테이너 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-600 flex items-center gap-2">
              <Layers size={24} />
              Image (이미지)
            </h2>
            <div className="space-y-2">
              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                <p className="font-semibold">
                  읽기 전용 템플릿
                </p>
              </div>
              <div className="bg-purple-100 p-2 rounded text-sm">
                Layer 4
              </div>
              <div className="bg-purple-100 p-2 rounded text-sm">
                Layer 3
              </div>
              <div className="bg-purple-100 p-2 rounded text-sm">
                Layer 2
              </div>
              <div className="bg-purple-200 p-2 rounded text-sm font-bold">
                Base Image
              </div>
              <p className="text-xs text-gray-600 mt-2">
                예: nginx:latest, ubuntu:20.04
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-green-600 flex items-center gap-2">
              <Box size={24} />
              Container (컨테이너)
            </h2>
            <div className="space-y-2">
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <p className="font-semibold">
                  이미지의 실행 인스턴스
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <p className="text-sm font-semibold mb-2">
                  컨테이너 상태:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="bg-green-200 px-2 py-1 rounded">
                    Running
                  </span>
                  <span className="bg-yellow-200 px-2 py-1 rounded">
                    Paused
                  </span>
                  <span className="bg-gray-200 px-2 py-1 rounded">
                    Stopped
                  </span>
                  <span className="bg-red-200 px-2 py-1 rounded">
                    Exited
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 저장소 구조 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-orange-600 flex items-center gap-2">
            <Package size={24} />
            저장소 구조
          </h2>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="bg-orange-100 rounded-lg p-4 w-48">
                <p className="font-bold text-lg">
                  Registry
                </p>
                <p className="text-sm text-gray-600">
                  Docker Hub
                </p>
                <div className="mt-4 bg-orange-200 rounded p-3">
                  <p className="font-semibold">
                    Repository
                  </p>
                  <p className="text-xs">
                    nginx
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="bg-white px-2 py-1 rounded text-xs">
                      Tag: latest
                    </div>
                    <div className="bg-white px-2 py-1 rounded text-xs">
                      Tag: 1.21
                    </div>
                    <div className="bg-white px-2 py-1 rounded text-xs">
                      Tag: alpine
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 네트워크와 데이터 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-cyan-600 flex items-center gap-2">
              <Network size={24} />
              네트워크
            </h2>
            <div className="space-y-3">
              <div className="bg-cyan-50 p-3 rounded">
                <p className="font-semibold">
                  Bridge Network
                </p>
                <p className="text-xs text-gray-600">
                  기본 네트워크, 컨테이너 간 통신
                </p>
              </div>
              <div className="bg-cyan-50 p-3 rounded">
                <p className="font-semibold">
                  Host Network
                </p>
                <p className="text-xs text-gray-600">
                  호스트 네트워크 직접 사용
                </p>
              </div>
              <div className="bg-cyan-100 p-3 rounded">
                <p className="font-semibold">
                  Port Binding
                </p>
                <p className="text-xs text-gray-600">
                  8080:80 (호스트:컨테이너)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-indigo-600 flex items-center gap-2">
              <Database size={24} />
              데이터 관리
            </h2>
            <div className="space-y-3">
              <div className="bg-indigo-50 p-3 rounded">
                <p className="font-semibold">
                  Volume
                </p>
                <p className="text-xs text-gray-600">
                  도커가 관리하는 저장 공간
                </p>
                <p className="text-xs text-indigo-600 mt-1">
                  ✓ 컨테이너 삭제 후에도 유지
                </p>
              </div>
              <div className="bg-indigo-50 p-3 rounded">
                <p className="font-semibold">
                  Bind Mount
                </p>
                <p className="text-xs text-gray-600">
                  호스트 경로를 직접 마운트
                </p>
                <p className="text-xs text-indigo-600 mt-1">
                  /host/path:/container/path
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Docker Compose */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-pink-600 flex items-center gap-2">
            <HardDrive size={24} />
            Docker Compose
          </h2>
          <div className="bg-pink-50 p-4 rounded">
            <p className="font-semibold mb-2">
              여러 컨테이너를 한 번에 관리
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm font-semibold">
                  Service 1
                </p>
                <p className="text-xs text-gray-600">
                  웹 서버
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm font-semibold">
                  Service 2
                </p>
                <p className="text-xs text-gray-600">
                  데이터베이스
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm font-semibold">
                  Service 3
                </p>
                <p className="text-xs text-gray-600">
                  캐시
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
              → Stack (전체 애플리케이션)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DockerArchitectureDiagram