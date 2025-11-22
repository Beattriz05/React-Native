export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  cell: string;
  picture: string;
  thumbnail: string;
  location: string;
  age: number;
}

export interface UsersState {
  data: UserData[];
  loading: boolean;
  error: string | null;
}

export interface LLMState {
  summary: string | null;
  loading: boolean;
  error: string | null;
}

export interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export interface UserCardProps {
  user: UserData;
  onPress: (user: UserData) => void;
}

export interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLast?: boolean;
}

export interface HomeScreenProps {
  users: UserData[];
  loading: boolean;
  error: string | null;
  onUserPress: (user: UserData) => void;
  onRefresh: () => void;
}

export interface UserDetailScreenProps {
  user: UserData;
  goBack: () => void;
}