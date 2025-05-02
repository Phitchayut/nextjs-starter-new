
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import useModalStore from '@/store/modal/modalStore';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '@/utils/Constant';

type Props = {
  users: User[];
  deleteUser: (id: number) => Promise<void>;
};
const UserTable = ({ users,deleteUser }: Props) => {
const router = useRouter();
const {openModal} = useModalStore();
  const handleView = async (id: number) => {
    router.push(`/user/${id}`);
  };
  const handleUpdate = async (item: User) => {
    openModal({
      title: 'Update User',
      bodyType: MODAL_BODY_TYPES.UPDATE_USER,
      extraObject: item,
    })
  };
  const handleDelete = async (id: number) => {
    openModal({
      title: 'Delete User',
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { 
        id,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.DELETE_USER
       },
    })
  };

  const columns: { key: string; label: string }[] = [
    {
      key: "avatar",
      label: "avatar",
    },
    {
      key: "name",
      label: "name",
    },
    {
      key: "email",
      label: "email",
    },
    {
      key: "role",
      label: "role",
    },
    {
      key: "action",
      label: "action",
    },
  ];

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((item: User) => (
            <TableRow key={item.email}>
              <TableCell className="font-medium  text-card-foreground/80">
                <Avatar>
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium  text-card-foreground/80">{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>

              <TableCell>
                <Badge variant="outline" color={(item.role === "5" && "default") || (item.role === "7" && "success") || (item.role === "5" && "info") || (item.role === "9" && "warning") || "default"} className="capitalize">
                  {item.role}
                </Badge>
              </TableCell>
              <TableCell className="ltr:pr-5 rtl:pl-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" color="secondary" className=" h-7 rounded-full bg-transparent w-7 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground  ">
                      <Icon icon="heroicons:ellipsis-horizontal" className=" h-6 w-6 " />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" avoidCollisions>
                    <DropdownMenuItem onClick={() => handleView(item.id ?? 0)}>
                      <Icon
                        icon="heroicons:eye"
                        className=" h-4 w-4 mr-2 "
                      />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdate(item)}>
                      <Icon icon="heroicons:pencil" className=" h-4 w-4 mr-2 " />
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item.id ?? 0)}>
                      <Icon icon="heroicons:trash" className=" h-4 w-4 mr-2 " />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UserTable;
