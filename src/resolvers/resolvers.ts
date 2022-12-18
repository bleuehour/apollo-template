import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me() {
    const users = await User.findOne({
      where: {
        id: 1,
      },
    });
    return users;
  }

  @Mutation(() => User)
  async user(@Arg("username") username: string) {
    const user = new User();
    user.username = username;
    await user.save();
    return user;
  }
}
