import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Project, ProjectStatus } from "types/common";

interface BaseRepository<T> {
  create(item: Omit<T, "id">): Promise<T>;
  update(id: string, item: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  findAll(): any;
  find(key: keyof T, value: T[keyof T]): Promise<T[]>;
  findOne(uniqueKey: keyof T, value: T[keyof T]): Promise<T>;
  exist(id: string | Partial<T>): Promise<boolean>;
}

export class SupbaseRepository<T> implements BaseRepository<T> {
  supabase: SupabaseClient;

  constructor(public readonly tableName: string) {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY as string
    );
  }

  async create(item: Omit<T, "id">): Promise<T> {
    const { data, error } = await this.supabase
      .from<T>(this.tableName)
      .insert(item as Partial<T>);
    if (error) throw error;
    return data as unknown as T;
  }
  async update(id: string, item: Partial<T>): Promise<boolean> {
    const { data, error } = await this.supabase
      .from<T>(this.tableName)
      .update(item as Partial<T>)
      .match({ id });

    return !!data && !error;
  }
  async delete(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from<T>(this.tableName)
      .delete()
      .match({ id });
    return !error;
  }

  findAll() {
    return this.supabase.from<T>(this.tableName).select("*");
  }

  async find(key: keyof T, value: T[keyof T]): Promise<T[]> {
    const { data, error } = await this.supabase
      .from<T>(this.tableName)
      .select("*")
      .eq(key, value);
    if (error) throw error;
    return data;
  }

  async findOne(uniqueKey: keyof T, value: T[keyof T]): Promise<T> {
    const { data, error } = await this.supabase
      .from<T>(this.tableName)
      .select("*")
      .eq(uniqueKey, value)
      .limit(1)
      .single();
    if (error) throw error;
    return data;
  }

  async exist(id: string | Partial<T>): Promise<boolean> {
    const { error } = await this.supabase
      .from<T>(this.tableName)
      .select("*")
      // @ts-ignore
      .eq("id", id)
      .limit(1)
      .single();
    console.log(error);
    if (error) return false;
    return true;
  }
}

export class ProjectsRepositoty extends SupbaseRepository<Project> {
  constructor() {
    super("projects");
  }

  async findByStatus(status: ProjectStatus, limit: number = 10) {
    let builder = this.findAll();
    if (status === "upcoming") {
      builder = builder.is("whitelist_start", null);
    } else if (status === "ended") {
      builder = builder.eq("is_closed", true);
    } else if (status === "live") {
      builder = builder
        .not("whitelist_start", "is", null)
        .eq("is_closed", false);
    }
    const { data, error } = await builder.limit(limit);

    if (error) throw error;
    return data;
  }

  async findOnHomeProjects() {
    // const now = new Date();
    // const { data, error } = await this.findAll().or(`sale_end.is.null,sale_end.gt.${now.toISOString()}`).limit(6);
    const { data, error } = await this.findAll()
      .eq("is_featured", true)
      .limit(6);

    if (error) throw error;
    return data;
  }
}
