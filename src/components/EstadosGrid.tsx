"use client";
import { EstadoSlugType, EstadoType } from "@/types";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import states from "@/jsons/states.json";
import {
  HomeIcon,
  CloudIcon,
  SunIcon,
  MapIcon,
  GlobeAmericasIcon,
  BuildingOffice2Icon,
  FlagIcon,
  SparklesIcon,
  StarIcon,
  BuildingLibraryIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { useEffect, useState } from "react";

const stateIcons: Record<
  EstadoSlugType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  alabama: HomeIcon,
  alaska: CloudIcon,
  arizona: SunIcon,
  arkansas: MapIcon,
  california: GlobeAmericasIcon,
  colorado: GlobeAmericasIcon,
  connecticut: BuildingOffice2Icon,
  delaware: FlagIcon,
  florida: MapIcon,
  georgia: HomeIcon,
  hawaii: SparklesIcon,
  idaho: MapIcon,
  illinois: BuildingOffice2Icon,
  indiana: FlagIcon,
  iowa: HomeIcon,
  kansas: MapIcon,
  kentucky: StarIcon,
  louisiana: BuildingLibraryIcon,
  maine: MapIcon,
  maryland: FlagIcon,
  massachusetts: BuildingOffice2Icon,
  michigan: GlobeAmericasIcon,
  minnesota: CloudIcon,
  mississippi: MapIcon,
  missouri: MapPinIcon,
  montana: MapIcon,
  nebraska: MapIcon,
  nevada: SunIcon,
  "new-hampshire": MapIcon,
  "new-jersey": BuildingOffice2Icon,
  "new-mexico": SunIcon,
  "new-york": BuildingOffice2Icon,
  "north-carolina": MapPinIcon,
  "north-dakota": MapIcon,
  ohio: BuildingOffice2Icon,
  oklahoma: MapIcon,
  oregon: CloudIcon,
  pennsylvania: BuildingLibraryIcon,
  "rhode-island": MapPinIcon,
  "south-carolina": SunIcon,
  "south-dakota": MapIcon,
  tennessee: StarIcon,
  texas: StarIcon,
  utah: MapIcon,
  "district-of-columbia": MapIcon,
  virginia: BuildingLibraryIcon,
  washington: CloudIcon,
  "west-virginia": MapIcon,
  wisconsin: HomeIcon,
  wyoming: MapIcon,
};

export default function EstadosGrid() {
  const [show_all, setShowAll] = useState<boolean>(false);
  const [filteredStates, setFilteredStates] = useState<Record<
    EstadoSlugType,
    EstadoType
  > | null>();
  const [searchEstado, setSearchEstado] = useState<string>("");

  useEffect(() => {
    if (searchEstado.trim() != "") {
      const filtered = Object.fromEntries(
        Object.entries(states).filter(([slug, state]) =>
          state.name.toLowerCase().includes(searchEstado.toLowerCase()),
        ),
      ) as Record<EstadoSlugType, EstadoType>;

      setFilteredStates(filtered);
    } else {
      setFilteredStates(states);
    }
  }, [searchEstado]);

  useEffect;

  const estados_populares = [
    states["arizona"],
    states["california"],
    states["florida"],
    states["texas"],
  ];

  return (
    <>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {estados_populares.map((estado, index) => {
            const Icon = stateIcons[estado.slug as EstadoSlugType];
            return (
              <div
                key={estado.slug}
                className="overflow-hidden group relative rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10"
              >
                <div className="p-4 flex flex-col group-hover:bg-gray-50/50 group-hover:brightness-95 items-start gap-4">
                  <div className="flex w-full justify-between items-center">
                    <span
                      style={{ backgroundColor: stringToHexColor(estado.slug) }}
                      className="p-2 rounded bg-cyan-700"
                    >
                      <Icon aria-hidden="true" className="size-7 text-white" />
                    </span>
                    <span className="bg-gray-100 rounded-full p-2">
                      <ArrowRightIcon aria-hidden="true" className="size-4" />
                    </span>
                  </div>
                  <div>
                    <Link
                      href={`/estado/${estado.slug}`}
                      className="font-bold text-xl text-gray-800 focus:outline-hidden"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {estado.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-2">
                      Prepárate para el examen de manejo de {estado.name} en
                      español.
                    </p>
                  </div>
                  <span
                    className="text-xs py-1.5 px-3 rounded-full text-white"
                    style={{ backgroundColor: stringToHexColor(estado.slug) }}
                  >
                    {110 + index ** 4}+ preguntas
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-b border-gray-200 mt-6 pb-5 sm:flex sm:items-end sm:justify-between dark:border-white/10">
          <h3 className="text-base text-lg font-semibold text-gray-900 dark:text-white">
            Todos los estados
          </h3>
          <div className="mt-3 flex sm:mt-0 sm:ml-4">
            <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
              <input
                id="estado_search"
                name="query"
                type="estado_search"
                placeholder="Buscar estado..."
                aria-label="Buscar estado"
                value={searchEstado}
                onChange={(event) => setSearchEstado(event.target.value)}
                className="col-start-1 row-start-1 block w-full sm:w-xs sm:w-sm rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:pl-9 sm:text-sm/6 dark:bg-gray-800/50 dark:text-white dark:outline-gray-700 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
              />
            </div>
          </div>
        </div>
        {filteredStates != null ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {Object.values(filteredStates).map((estado, index: number) => {
                const Icon = stateIcons[estado.slug as EstadoSlugType];
                return (
                  <div
                    key={estado.slug}
                    className={`${index > 5 && !show_all ? "hidden" : ""} overflow-hidden group relative rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10`}
                  >
                    <div className="p-4 flex flex-col group-hover:bg-gray-50/50  group-hover:brightness-95 items-start gap-4">
                      <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Icon
                            aria-hidden="true"
                            className="size-7"
                            style={{ color: stringToHexColor(estado.slug) }}
                          />
                          <Link
                            href={`/estado/${estado.slug}`}
                            className="font-medium  focus:outline-hidden"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {estado.name}
                          </Link>
                        </div>
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="size-4.5 group-hover:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {!show_all && Object.keys(filteredStates).length > 6 && (
              <div className="flex justify-center mt-6">
                <div className="overflow-hidden group relative rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="flex gap-3 pl-4 py-2 px-3 items-center group-hover:bg-gray-50/50 active:brightness-100 group-hover:brightness-95 justify-between"
                  >
                    <span>Ver todos los estados</span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 group-hover:text-gray-500"
                    />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          "EMPTY"
        )}
      </div>
    </>
  );
}

const stringToHexColor = (str: string) => {
  let hash = 0;

  // Generate a hash code from the string
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // hash * 33 + charCode
  }

  let color = "#";

  // Extract RGB components from the hash code
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0"); // Ensure 2 digits per component
  }

  return color;
};
