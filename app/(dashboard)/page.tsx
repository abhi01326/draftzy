// "use client";

// import { useOrganization } from "@clerk/nextjs";
// import { BoardList } from "./_components/board-list";
// import { EmptyOrg } from "./_components/empty-org";

// interface DashboardProps {
//   searchParams: {
//     search?: string;
//     favorites?: string;
//   };
// }


// export default function Home({
//   searchParams,
// }: DashboardProps) {
//   const { organization } = useOrganization();
//   return (
//     <div className=" flex-1 h-[calc(100%-80px)]">
//       {organization ? (
//         <BoardList 
//         orgId= {organization.id}
//         query={searchParams}
//         />
//       ) : (
//         <EmptyOrg />
//       )}
//     </div>
//   );
// }

"use client";

import { useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";

export default function Home() {
  const { organization } = useOrganization();
  const searchParams = useSearchParams();

  const query = {
    search: searchParams.get("search") ?? undefined,
    favorites: searchParams.get("favorites") ?? undefined,
  };

  return (
    <div className="flex-1 h-[calc(100%-80px)]">
      {organization ? (
        <BoardList
          orgId={organization.id}
          query={query}
        />
      ) : (
        <EmptyOrg />
      )}
    </div>
  );
}
